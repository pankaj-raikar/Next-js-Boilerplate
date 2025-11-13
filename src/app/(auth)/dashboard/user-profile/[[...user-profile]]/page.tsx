import type { Metadata } from 'next';
import { UserProfile } from '@clerk/nextjs';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'User Profile',
  };
}

export default async function UserProfilePage() {
  return (
    <div className="my-6 -ml-16">
      <UserProfile
        path="/dashboard/user-profile"
      />
    </div>
  );
};
