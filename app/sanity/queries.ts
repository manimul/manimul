import groq from 'groq';

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle, heroImage, sectionImage }`;

export const PROJECTS_QUERY = groq`*[_type == "project"][0...12]|order(title asc){
    _id,
    _type,
    title,
    releaseDate,
    "slug": slug.current,
    "artist": artist->name,
    image
  } | order(releaseDate desc)`;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  _id,
  title,
  releaseDate,
  // GROQ can re-shape data in the request!
  "slug": slug.current,
  "artist": artist->name,
  // coalesce() returns the first value that is not null
  // so we can ensure we have at least a zero
  "likes": coalesce(likes, 0),
  "dislikes": coalesce(dislikes, 0),
  // for simplicity in this demo these are typed as "any"
  // we can make them type-safe with a little more work
  // https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
  image,
  content,
  // this is how we extract values from arrays
  tracks[]{
    _key,
    title,
    duration
  }
}`;
