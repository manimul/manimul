import { z } from 'zod';

export const profileZ = z.object({
  title: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string().nullable(),
  experience: z.array(
    z.object({
      title: z.string().nullable(),
      employer: z.string().nullable(),
      link: z.string().nullable(),
      startDate: z.any().nullable(),
      endDate: z.any().nullable(),

      description: z.array(z.any()).nullable(),
    })
  ),
});

export type ProfileDocument = z.infer<typeof profileZ>;
