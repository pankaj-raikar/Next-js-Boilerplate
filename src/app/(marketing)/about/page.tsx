import type { Metadata } from 'next';

import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About',
    description: 'About',
  };
}

export default async function About() {
  return (
    <>
      <p>About</p>

      <div className="mt-2 text-center text-sm">
        {`Powered by `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://l.crowdin.com/next-js"
        >
          Crowdin
        </a>
      </div>

      <a href="https://l.crowdin.com/next-js">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/crowdin-dark.png"
          alt="Crowdin Translation Management System"
          width={128}
          height={26}
        />
      </a>
    </>
  );
};
