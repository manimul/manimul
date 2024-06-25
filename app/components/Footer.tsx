import { Logo } from '~/components/Logo';
import type { LogoProps } from '~/types/home';

export function Footer(props: LogoProps) {
  return (
    <header className='border-t border-gray-100 transition-colors duration-1000 ease-in-out '>
      <div className='container mx-auto flex items-center justify-between p-4 lg:px-12'>
        <span className='text-sm font-semibold'>
          2024. This website was built with Remix and Tailwind and uses Sanity
          CMS
        </span>
        <Logo className={'lg:text-8xl'} home={props.home} />
      </div>
    </header>
  );
}
