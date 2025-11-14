import { currentUser } from '@clerk/nextjs/server';
import { Sponsors } from './Sponsors';

export const Hello = async () => {
  const user = await currentUser();

  return (
    <>
      <p>
        {`👋 `}
        {user?.primaryEmailAddress?.emailAddress ?? ''}
      </p>
      <p>
        {`or `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://nextjs-boilerplate.com/pro-saas-starter-kit"
        >
          Next.js Boilerplate Pro
        </a>
      </p>
      <Sponsors />
    </>
  );
};
