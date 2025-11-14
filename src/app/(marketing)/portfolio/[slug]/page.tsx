import type { Metadata } from 'next';
import Image from 'next/image';

type PortfolioPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: PortfolioPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;

  return {
    title: `Portfolio - ${slug}`,
    description: `Portfolio - ${slug}`,
  };
}

export default async function PortfolioDetail(props: PortfolioPageProps) {
  const { slug } = await props.params;

  return (
    <>
      <h1 className="capitalize">
        Portfolio -
        {' '}
        {slug}
      </h1>
      <p>
        Portfolio -
        {' '}
        {slug}
      </p>

      <div className="mt-5 text-center text-sm">
        {`Powered by `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
        >
          CodeRabbit
        </a>
      </div>

      <a
        href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
      >
        <Image
          className="mx-auto mt-2"
          src="/assets/images/coderabbit-logo-light.svg"
          alt="CodeRabbit"
          width={128}
          height={22}
        />
      </a>
    </>
  );
}
