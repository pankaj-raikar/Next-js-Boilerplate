import type { NextFetchEvent } from 'next/server';
import { detectBot } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

const isWebhookRoute = createRouteMatcher([
  '/api/webhooks(.*)',
]);

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    allow: [
      'CATEGORY:SEARCH_ENGINE',
      'CATEGORY:PREVIEW',
      'CATEGORY:MONITOR',
    ],
  }),
);

export default clerkMiddleware(async (auth, request, _event: NextFetchEvent) => {
  // Verify the request with Arcjet
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  if (isWebhookRoute(request)) {
    console.warn('Webhook received');
    return NextResponse.next();
  }

  if (isProtectedRoute(request)) {
    const signInUrl = new URL('/sign-in', request.url);

    await auth.protect({
      unauthenticatedUrl: signInUrl.toString(),
    });
  }

  return NextResponse.next();
});

export const config = {
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};
