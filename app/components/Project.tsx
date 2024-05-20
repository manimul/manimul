import type { EncodeDataAttributeCallback } from '@sanity/react-loader';

import { ProjectCover } from '~/components/ProjectCover';
import { SanityContent } from '~/components/SanityContent';
import { Title } from '~/components/Title';
import type { ProjectDocument } from '~/types/project';

type ProjectProps = {
  data: ProjectDocument;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Project({ data, encodeDataAttribute }: ProjectProps) {
  const { _id, title, content, image } = data;

  return (
    <article className='flex flex-col items-start gap-4 lg:flex-row lg:gap-12'>
      <div className='grid-gap-4 grid max-w-[70vw] grid-cols-1'>
        <div className='max-w-sm' data-sanity={encodeDataAttribute?.('image')}>
          <ProjectCover image={image} />
        </div>
      </div>
      <div className='flex flex-shrink-0 flex-col gap-4 lg:gap-6 lg:w-2/3'>
        <header>
          <Title>{title}</Title>
        </header>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </article>
  );
}
