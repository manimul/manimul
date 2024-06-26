import { Link } from '@remix-run/react';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader';

import { ProjectCover } from '~/components/ProjectCover';
import type { ProfileDocument } from '~/types/profile';
import { dataset, projectId } from '~/sanity/projectDetails';
import urlBuilder from '@sanity/image-url';
import { SanityContent } from './SanityContent';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';

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
    <section className=' p-4 md:p-12 border-2 border-dashed bg-[#FFFAF2] border-[#F7DFB9] rounded-3xl  '>
      <div className='flex flex-col md:flex-row md:gap-12'>
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
          {title && <h1 className=' text-6xl font-semibold'>{title}</h1>}
          {content && content?.length > 0 ? (
            <SanityContent value={content} />
          ) : null}
          {email && (
            <a
              href={`mailto:${email}`}
              className='inline-flex font-bold gap-1 lowercase items-center '
            >
              <MailIcon size={18} />
              <span className=' relative after:bg-[#0A332D] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer '>
                Email
              </span>
            </a>
          )}
          {linkedin && (
            <a
              className='inline-flex gap-1 font-bold lowercase items-center'
              href={linkedin}
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedinIcon size={18} />
              <span className=' relative after:bg-[#0A332D] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer '>
                LinkedIn
              </span>
            </a>
          )}

          {github && (
            <a
              className='inline-flex gap-1 font-bold lowercase items-center'
              href={github}
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon size={18} />
              <span className=' relative after:bg-[#0A332D] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer '>
                Github
              </span>
            </a>
          )}
        </div>
      </div>
      <h2 className='mt-8 text-2xl md:text-4xl'>Experience</h2>
      <div className='w-full'>
        {experience && experience?.length > 0 ? (
          <ul>
            {experience.map((exp, expI) => (
              <li
                className='grid grid-flow-row grid-cols-3  w-full gap-2 my-4 md:my-8'
                key={expI}
              >
                <h2 className='text-lg font-bold md:text-2xl col-span-2'>
                  {exp.title}
                </h2>
                <p className='col-span-1 text-right text-sm'>
                  {formatYear(exp.startDate)} - {formatYear(exp.endDate)}
                </p>
                <p className='col-span-3'>
                  {' '}
                  {exp.link && exp.employer ? (
                    <a
                      href={exp.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-medium text-sm md:text-base'
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
