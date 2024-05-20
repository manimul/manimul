import { Link } from '@remix-run/react';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import {
  ArrowBigRightDash,
  ArrowDownRightSquare,
  ArrowRightToLine,
  ArrowUpRight,
  ArrowUpRightSquare,
} from 'lucide-react';

import { ProjectCover } from '~/components/ProjectCover';
import type { ProjectStub } from '~/types/project';

type ProjectProps = {
  projects: ProjectStub[];
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Projects(props: ProjectProps) {
  const { projects = [], encodeDataAttribute } = props;

  return projects.length > 0 ? (
    <section className='p-12 border-2 border-dashed border-[#F7DFB9] rounded-3xl '>
      <div className='flex justify-between'>
        <h1 className='font-semibold px-4 -mt-20 bg-[#F9EDDA]  mb-12 text-6xl'>
          Projects
        </h1>
        <Link
          to='/'
          className='lowercase font-semibold px-4 -mt-16 bg-[#F9EDDA]  mb-12 text-xl flex group'
        >
          see all{' '}
          <ArrowUpRight className='group-hover:rotate-45 transition-transform duration-300 ease-in-out' />
        </Link>
      </div>
      <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-4 lg:grid-cols-3'>
        {projects.map((project, projectI) => (
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
      <p>
        <a href='/studio'>Log in to your Sanity Studio</a> and start creating
        content!
      </p>
      <p>Or, run </p>
      <pre>
        <code>
          npx sanity@latest exec ./scripts/createData.ts --with-user-token
        </code>
      </pre>
      <p>
        from the command line to delete existing documents populate the site
        with content.{' '}
      </p>
    </div>
  );
}
