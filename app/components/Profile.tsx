import { Link } from '@remix-run/react';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader';

import { ProjectCover } from '~/components/ProjectCover';
import type { ProfileDocument } from '~/types/profile';
import { dataset, projectId } from '~/sanity/projectDetails';
import urlBuilder from '@sanity/image-url';
import { SanityContent } from './SanityContent';

type ProfileProps = {
  profile: ProfileDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Profile(props: ProfileProps) {
  const { profile, encodeDataAttribute } = props;

  const { title, image, content, email, phone, linkedin, github, experience } =
    profile;
  const formatYear = (date: string | number | Date) => {
    return date
      ? new Date(date).toLocaleDateString('en-US', { year: 'numeric' })
      : 'Present';
  };
  return (
    <section className='p-12 border-2 border-dashed bg-[#FFFAF2] border-[#F7DFB9] rounded-3xl  '>
      <div className='flex flex-row gap-12'>
        {image && (
          <img
            className='   '
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
        )}

        <div className='max-w-2xl flex flex-col gap-4'>
          {title && <h1 className=' text-4xl'>{title}</h1>}
          {content && content?.length > 0 ? (
            <SanityContent value={content} />
          ) : null}
          {email && <p>Email: {email}</p>}
          {linkedin && (
            <a href={linkedin} target='_blank' rel='noopener noreferrer'>
              LinkedIn
            </a>
          )}

          {github && (
            <a href={github} target='_blank' rel='noopener noreferrer'>
              GitHub
            </a>
          )}
        </div>
      </div>
      <h2 className='text-2xl'>Experience</h2>
      <div className='w-full'>
        {experience && experience?.length > 0 ? (
          <ul>
            {experience.map((exp, expI) => (
              <li
                className='grid grid-flow-row grid-cols-3  w-full gap-2 my-8'
                key={expI}
              >
                <h2 className='text-2xl col-span-2'>{exp.title}</h2>
                <p className='col-span-1 text-right'>
                  {formatYear(exp.startDate)} - {formatYear(exp.endDate)}
                </p>
                <p className='col-span-3'>
                  {' '}
                  {exp.link && exp.employer ? (
                    <a
                      href={exp.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {exp.employer}
                    </a>
                  ) : (
                    exp.employer && <p> {exp.employer}</p>
                  )}
                </p>

                {exp.description && (
                  <div className='col-span-3'>
                    <SanityContent value={exp.description} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
