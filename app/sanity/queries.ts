import groq from 'groq';

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle, heroImage, sectionImage }`;

export const PROJECTS_QUERY = groq`*[_type == "project"][0...12]|order(title asc){
    _id,
    _type,
    title,
    startDate,
    "slug": slug.current,
    client,
    
    image
  } `;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  _id,
  title,
 extract,
  link,
  image,
  // GROQ can re-shape data in the request!
  "slug": slug.current,
  
  // coalesce() returns the first value that is not null
  // so we can ensure we have at least a zero

  // for simplicity in this demo these are typed as "any"
  // we can make them type-safe with a little more work
  // https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
  content,
  client,
  role,
  details,
  startDate,
  endDate,
  "tags": tags[]{
    _key,
    "title": @->title,
    "slug": @->slug.current
  },
  images,
}`;

export const PROFILE_QUERY = groq`*[_type == "profile"][0]{
  title,
  image,
  content,
  email,
  phone,
  linkedin,
  github,
  experience,
}`;
