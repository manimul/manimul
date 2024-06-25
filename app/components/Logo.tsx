import { Link } from '@remix-run/react';

import type { LogoProps } from '~/types/home';

export function Logo(props: LogoProps & { className: string }) {
  const { siteTitle } = props.home ?? {};
  const { className } = props;

  return (
    <p
      className={`${className} text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl bg-[#F9EDDA] px-4 `}
    >
      <Link to='/'>{siteTitle ?? `Sanity Remix`}</Link>
    </p>
  );
}
