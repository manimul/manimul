import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { VisualEditing } from '@sanity/visual-editing/remix';

import { ExitPreview } from '~/components/ExitPreview';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { ProjectCover } from '~/components/ProjectCover';
import { Title } from '~/components/Title';
import { loadQuery } from '~/sanity/loader.server';
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server';
import { HOME_QUERY } from '~/sanity/queries';
import type { HomeDocument } from '~/types/home';
import { homeZ } from '~/types/home';
import type { ThemePreference } from '~/types/themePreference';
import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import { dataset, projectId } from '~/sanity/projectDetails';

type ProjectCoverProps = {
  image?: SanityImageObjectStub & { alt: string };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { preview, options } = await loadQueryOptions(request.headers);

  // Sanity content reused throughout the site
  const query = HOME_QUERY;
  const params = {};
  const initial = await loadQuery<HomeDocument>(query, params, options).then(
    (res) => ({
      ...res,
      data: res.data ? homeZ.parse(res.data) : undefined,
    })
  );

  return json({
    initial,
    query,
    params,
    sanity: { preview },
  });
};

export default function Website(props: ProjectCoverProps) {
  const { initial, query, params, sanity } = useLoaderData<typeof loader>();
  const { data: home } = useQuery<typeof initial.data>(query, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial,
  });
  const { pathname } = useLocation();

  return (
    <>
      <Header home={home} />
      <div className='container mx-auto p-4 lg:p-12 grid grid-cols-1 gap-4 border-2 border-dashed border-[#F7DFB9] -mt-4 z-0 lg:gap-12 rounded-3xl '>
        {home?.title && home?.heroImage && pathname === '/' ? (
          <section className='py-12 px-4 md:px-12   flex  items-center '>
            <div className='space-y-8'>
              <Title>{home?.title}</Title>
              <div className='lowercase font-semibold flex md:text-2xl space-x-8   '>
                <Link to='#' className='flex align-middle items-center     '>
                  <span className='inline-flex w-6 h-6 rounded-xl bg-[#F0531C] mr-2'></span>
                  <span className=' relative after:bg-[#F0531C] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer '>
                    See projects
                  </span>
                </Link>
                <Link to='#' className='flex align-middle items-center'>
                  <span className='inline-flex w-6 h-6 rounded-xl bg-[#5F9248] mr-2'></span>
                  <span className=' relative after:bg-[#5F9248] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer '>
                    About me
                  </span>{' '}
                </Link>
              </div>
            </div>
            <div className='-mr-48 -mt-24 hidden md:block'>
              <img
                className='h-auto w-full object-cover  '
                src={urlBuilder({ projectId, dataset })
                  .image(home?.heroImage)
                  .height(800)
                  .width(800)
                  .fit('max')
                  .auto('format')
                  .url()}
                alt={home?.heroImage?.alt ?? ``}
                loading='lazy'
              />
            </div>
          </section>
        ) : null}
        <Outlet />
      </div>
      <Footer home={home} />
      {sanity.preview ? (
        <>
          <VisualEditing />
          <ExitPreview />
        </>
      ) : null}
    </>
  );
}
