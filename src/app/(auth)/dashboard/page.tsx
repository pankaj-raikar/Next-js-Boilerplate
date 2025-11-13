import type { Metadata } from 'next';

import { Hello } from '@/components/Hello';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'meta_title',
  };
}

export default function Dashboard() {
  return (
    <div className="py-5 [&_p]:my-6">
      <Hello />
    </div>
  );
}
