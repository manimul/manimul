import { Link } from '@remix-run/react';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import {
  ArrowBigRightDash,
  ArrowDownRightSquare,
  ArrowRightToLine,
  ArrowUpRight,
  ArrowUpRightSquare,
} from 'lucide-react';
import { number } from 'zod';

import { ProjectCover } from '~/components/ProjectCover';
import type { ProjectStub } from '~/types/project';

type ProjectProps = {
  projects: ProjectStub[];
  numberOfProjects?: number;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Projects(props: ProjectProps) {
  const { projects = [], encodeDataAttribute, numberOfProjects } = props;
  const displayedProjects = numberOfProjects
    ? projects.slice(0, numberOfProjects)
    : projects;

  return projects.length > 0 ? (
    <section className='p-2 md:p-12 border-2 border-dashed border-[#F7DFB9] rounded-3xl '>
      <div className='flex justify-between'>
        {numberOfProjects ? (
          <>
            {' '}
            <h1 className='font-semibold md:px-4 -mt-6 md:-mt-20 bg-[#F9EDDA]  md:mb-12 text-2xl md:text-6xl'>
              Recent Projects
            </h1>
            <Link
              to='/'
              className='lowercase font-semibold px-4 -mt-6 md:-mt-16 bg-[#F9EDDA] mb-6  md:mb-12 text-xl flex group'
            >
              see all{' '}
              <ArrowUpRight className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
            </Link>
          </>
        ) : (
          <h1 className='font-semibold md:px-4 -mt-6 md:-mt-20 bg-[#F9EDDA]  md:mb-12 text-2xl md:text-6xl'>
            Projects
          </h1>
        )}
      </div>
      <ul className='grid sm:grid-cols-2 gap-2 md:grid-cols-3 lg:gap-4 lg:grid-cols-3'>
        {displayedProjects.map((project, projectI) => (
          <li
            key={project._id}
            className=' relative h-auto  group overflow-hidden rounded-2xl'
          >
            <div data-sanity={encodeDataAttribute?.([projectI, 'image'])}>
              {project?.slug && project?.title ? (
                <Link prefetch='intent' to={project?.slug}>
                  <ProjectCover
                    image={project.image}
                    title={project.title}
                    slug={project.slug}
                  />
                </Link>
              ) : (
                <ProjectCover image={project.image} />
              )}
            </div>
            <div className='flex flex-col -mt-6'></div>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No projects found, yet!</p>
    </div>
  );
}
