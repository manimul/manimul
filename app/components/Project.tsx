import type { EncodeDataAttributeCallback } from '@sanity/react-loader';

import { ProjectCover } from '~/components/ProjectCover';
import { SanityContent } from '~/components/SanityContent';
import urlBuilder from '@sanity/image-url';

import { Title } from '~/components/Title';
import type { ProjectDocument } from '~/types/project';
import { dataset, projectId } from '~/sanity/projectDetails';
import { de } from '@faker-js/faker';

type ProjectProps = {
  data: ProjectDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Project({ data, encodeDataAttribute }: ProjectProps) {
  const {
    _id,
    title,
    slug,
    extract,
    link,
    image,
    client,
    role,
    tags,
    details,
    startDate,
    endDate,
    images,
  } = data;

  return (
    <article className='flex flex-col items-start gap-4 lg:flex-row lg:gap-12 my-8'>
      <div className='flex flex-shrink-0 flex-col gap-4 lg:gap-6 w-full '>
        <header className='flex flex-col gap-4 lg:gap-6   text-center md:text-left lg:flex-row lg:justify-between items-center lg:items-end'>
          <Title>{title}</Title>{' '}
          {extract && (
            <div className=' lg:w-1/3 -mb-12 z-10 lg:-mr-32 bg-[#FFFAF2] p-6 rounded-lg'>
              <p>{extract}</p>{' '}
              {link && (
                <a
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-500 underline'
                >
                  {link}
                </a>
              )}
            </div>
          )}
        </header>
        <img
          className=' h-auto max-w-none object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out -ml-32 -mr-32  '
          src={urlBuilder({ projectId, dataset })
            .image(image)
            .height(700)
            .width(2000)
            .fit('max')
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
          loading='lazy'
        />
        <table className='table-auto mx-auto lg:w-3/4  bg-[#FFFAF2] rounded-xl '>
          <tbody className='p-6'>
            {client && (
              <tr className=' border-b border-[#F7DFB9] border-dashed'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Client
                </td>
                <td>{client}</td>
              </tr>
            )}
            {role && (
              <tr className=' border-b border-[#F7DFB9] border-dashed'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Role
                </td>
                <td> {role}</td>
              </tr>
            )}
            {startDate && (
              <tr className=' border-b border-[#F7DFB9] border-dashed'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Date
                </td>
                <td>
                  {startDate} - {endDate ? endDate : 'present'}
                </td>
              </tr>
            )}

            {tags && tags?.length > 0 ? (
              <tr className=' border-b border-[#F7DFB9] border-dashed'>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Tags
                </td>
                <td>
                  {tags && tags?.length > 0 ? (
                    <ul className='flex flex-row space-x-2'>
                      {tags.map((tag) => (
                        <li
                          className='px-3 py-0.5 rounded-2xl bg-[#F7DFB9] '
                          key={tag._key}
                        >
                          <a href={`/tags/${tag.slug}`}>{tag.title}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </td>
              </tr>
            ) : null}
            {details && details?.length > 0 ? (
              <tr>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Details
                </td>
                <td>
                  {details && details?.length > 0 ? (
                    <SanityContent value={details} />
                  ) : null}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>

        {images && images?.length > 0 ? (
          <div>
            {images.map((image) => (
              <figure className='my-12'>
                <img
                  className=' h-auto w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
                  src={urlBuilder({ projectId, dataset })
                    .image(image)
                    .height(600)
                    .width(1200)
                    .fit('max')
                    .auto('format')
                    .url()}
                  alt={image?.alt ?? ``}
                  loading='lazy'
                />
                <figcaption className=' text-left text-base text-neutral-600  bg-[#FFFAF2] p-4 rounded-b-xl'>
                  {image?.caption ?? ''}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
