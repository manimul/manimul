import { Link } from '@remix-run/react';
import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { ArrowUpRight } from 'lucide-react';

import { dataset, projectId } from '~/sanity/projectDetails';

type ProjectCoverProps = {
  image?: SanityImageObjectStub & { alt: string };
  title?: string;
  slug?: string;
};

export function ProjectCover(props: ProjectCoverProps) {
  const { image, title, slug } = props;

  return (
    <>
      {image && title && slug ? (
        <>
          <img
            className=' h-auto w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
            src={urlBuilder({ projectId, dataset })
              .image(image)
              .height(1000)
              .width(800)
              .fit('max')
              .auto('format')
              .url()}
            alt={image?.alt ?? ``}
            loading='lazy'
          />
          <Link
            prefetch='intent'
            to={slug}
            className='absolute lowercase bg-[#F9EDDA] bg-opacity-50 backdrop-blur-lg  group-hover:bg-opacity-100 left-4 bottom-4  right-4 p-2 rounded-md     text-bold  text-xl font-bold tracking-tighter   lg:text-xl flex justify-between '
          >
            {title}{' '}
            <ArrowUpRight className=' group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
          </Link>
        </>
      ) : (
        <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
          Missing Record art
        </div>
      )}
    </>
  );
}
