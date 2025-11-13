import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sign Up',
    description: 'Create your account to get started',
  };
}

export default async function SignUpPage() {
  return <SignUp path="/sign-up" />;
};
