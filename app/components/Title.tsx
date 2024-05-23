import type { PropsWithChildren } from 'react';

export function Title({ children }: PropsWithChildren) {
  return (
    <>
      <h1 className='text-bold max-w-4xl text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl text-balance'>
        {children}
      </h1>
    </>
  );
}
