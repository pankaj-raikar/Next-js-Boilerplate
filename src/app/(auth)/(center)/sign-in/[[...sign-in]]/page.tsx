import type { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'meta_title',
    description: 'meta_description',
  };
}

export default async function SignInPage() {
  return <SignIn path="/sign-in" />;
}
