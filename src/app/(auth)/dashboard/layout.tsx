import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href="/dashboard/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Profile
            </Link>
          </li>
        </>
      )}
      rightNav={(
        <>
          <li>
            <SignOutButton>
              <button className="border-none text-gray-700 hover:text-gray-900" type="button">
                Sign Out
              </button>
            </SignOutButton>
          </li>
        </>
      )}
    >
      {props.children}
    </BaseTemplate>
  );
}
