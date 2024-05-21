import { z } from 'zod';
import { client } from '~/sanity/client';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const projectZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  extract: z.string().nullable(),
  link: z.string().nullable(),
  client: z.string().nullable(),
  role: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  image: z.any().nullable(),
  //tag: z.array(z.any()).nullable(),
  tags: z
    .array(
      z.object({
        title: z.any().nullable(),
        slug: z.any().nullable(),
        _key: z.string().nullable(),
      })
    )
    .nullable(),
  images: z.array(z.any()).nullable(),
  details: z.array(z.any()).nullable(),
});

export type ProjectDocument = z.infer<typeof projectZ>;

export const projectsZ = z.array(projectZ);

export const projectStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  client: z.string().nullable(),
  startDate: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
});

export const projectStubsZ = z.array(projectStubZ);

export type ProjectStub = z.infer<typeof projectStubZ>;
