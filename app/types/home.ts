import { z } from 'zod';

export const homeZ = z.object({
  title: z.string().nullable(),
  siteTitle: z.string().nullable(),
  heroImage: z.any().nullable(),
  sectionImage: z.any().nullable(),
});

export type HomeDocument = z.infer<typeof homeZ>;

export type LogoProps = { home?: HomeDocument | null };
