import { Link } from '@remix-run/react';

import type { LogoProps } from '~/types/home';

export function Logo(props: LogoProps) {
  //update so that classnames can be pass§ed in

  const { siteTitle } = props.home ?? {};

  if (!siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    );
  }

  return (
    <p className='text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl bg-[#F9EDDA] px-4'>
      <Link to='/'>{siteTitle ?? `Sanity Remix`}</Link>
    </p>
  );
}
