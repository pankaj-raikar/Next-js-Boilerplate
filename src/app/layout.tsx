import { ClerkProvider } from '@clerk/nextjs';
import { Outfit } from 'next/font/google';

import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/global.css';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signInUrl = '/sign-in';
  const signUpUrl = '/sign-up';
  const dashboardUrl = '/dashboard';
  const afterSignOutUrl = '/';

  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ClerkProvider
          appearance={{
            cssLayerName: 'clerk', // Ensure Clerk is compatible with Tailwind CSS v4
          }}
          signInUrl={signInUrl}
          signUpUrl={signUpUrl}
          signInFallbackRedirectUrl={dashboardUrl}
          signUpFallbackRedirectUrl={dashboardUrl}
          afterSignOutUrl={afterSignOutUrl}
        >
          <ThemeProvider>
            <PostHogProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </PostHogProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
