import { NavLink } from '@remix-run/react';
import type { LayoutProps } from '~/components/Layout';
import { Logo } from '~/components/Logo';
import { ThemeToggle } from '~/components/ThemeToggle';

export function Header(props: LayoutProps) {
  return (
    <header className=' transition-colors duration-1000 ease-in-out dark:border-gray-900 z-10 bg-[#F9EDDA] '>
      <div className='container mx-auto flex items-center justify-between pt-9  lg:px-12 '>
        <nav className='flex gap-4 bg-[#F9EDDA] px-4 mx-auto lowercase text-xl font-semibold'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/projects'>Projects</NavLink>
        </nav>
      </div>
    </header>
  );
}
