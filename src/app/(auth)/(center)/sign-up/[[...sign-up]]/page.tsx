import type { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'meta_title',
    description: 'meta_description',
  };
}

export default async function SignUpPage() {
  return <SignUp path="/sign-up" />;
};
