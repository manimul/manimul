import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useQuery } from '@sanity/react-loader';
import { Loading } from '~/components/Loading';
import { Projects } from '~/components/Projects';
import type { loader as layoutLoader } from '~/routes/_website';
import { loadQuery } from '~/sanity/loader.server';
import { loadQueryOptions } from '~/sanity/loadQueryOptions.server';
import { HOME_QUERY, PROJECTS_QUERY, PROFILE_QUERY } from '~/sanity/queries';
import type { ProjectStub } from '~/types/project';
import type { ProfileDocument } from '~/types/profile';
import { profileZ } from '~/types/profile';
import { projectStubsZ } from '~/types/project';
import { Profile } from '~/components/Profile';

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
  const profileQuery = PROFILE_QUERY;
  const queryParams = {};
  const initial = await loadQuery<ProfileDocument>(
    profileQuery,
    queryParams,
    options
  ).then((res) => ({
    ...res,
    data: res.data ? profileZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    initial,

    profileQuery,

    params: queryParams,
  });
};

export default function Index() {
  const { initial, profileQuery, params } = useLoaderData<typeof loader>();
  const { data, loading, encodeDataAttribute } = useQuery<typeof initial.data>(
    profileQuery,
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
      <Profile
        profile={data || initial.data}
        encodeDataAttribute={encodeDataAttribute}
      />
    </>
  );
}
