import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { Loading } from '~/components/Loading';
import { Projects } from '~/components/Projects';
import type { loader as layoutLoader } from '~/routes/_website';
import { loadQuery } from '~/sanity/loader.server';
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server';
import { HOME_QUERY, PROJECTS_QUERY } from '~/sanity/queries';
import type { ProjectStub } from '~/types/project';
import { projectStubsZ } from '~/types/project';

export const meta: MetaFunction<
  typeof loader,
  {
    'routes/_website': typeof layoutLoader;
  }
> = ({ matches }) => {
  const layoutData = matches.find(
    (match) => match.id === `routes/_website`
  )?.data;
  const home = layoutData ? layoutData.initial.data : null;
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ');

  return [{ title }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers);
  const projectsQuery = PROJECTS_QUERY;
  const homeQuery = HOME_QUERY;
  const queryParams = {};
  const initial = await loadQuery<ProjectStub[]>(
    projectsQuery,
    queryParams,
    options
  ).then((res) => ({
    ...res,
    data: res.data ? projectStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    initial,
    projectsQuery,
    params: queryParams,
  });
};

export default function Index() {
  const { initial, projectsQuery, params } = useLoaderData<typeof loader>();
  const { data, loading, encodeDataAttribute } = useQuery<typeof initial.data>(
    projectsQuery,
    params,
    {
      // There's a TS issue with how initial comes over the wire
      // @ts-expect-error
      initial,
    }
  );

  if (loading && !data) {
    return <Loading />;
  } else if (!data || !initial.data) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Projects
        projects={data || initial.data}
        encodeDataAttribute={encodeDataAttribute}
      />
    </>
  );
}
