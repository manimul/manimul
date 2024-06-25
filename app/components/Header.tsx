import { NavLink } from '@remix-run/react';
import { Logo } from '~/components/Logo';

export function Header(home: any) {
  return (
    <header className=' transition-colors duration-1000 ease-in-out z-10 '>
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
