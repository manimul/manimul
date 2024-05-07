import { z } from 'zod';

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
  likes: z.number(),
  dislikes: z.number(),
  artist: z.string().nullable(),
  tracks: z
    .array(
      z.object({
        _key: z.string(),
        title: z.string().nullable(),
        duration: z.number().nullable(),
      })
    )
    .nullable(),
  // ...being a touch lazy here, these could be more strongly typed
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
});

export type ProjectDocument = z.infer<typeof projectZ>;

export const projectsZ = z.array(projectZ);

export const projectStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  releaseDate: z.string().nullable(),
  slug: z.string().nullable(),
  artist: z.string().nullable(),
  image: z.any().nullable(),
});

export const projectStubsZ = z.array(projectStubZ);

export type ProjectStub = z.infer<typeof projectStubZ>;
