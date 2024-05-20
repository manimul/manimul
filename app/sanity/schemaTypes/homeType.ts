import { Home } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      description: 'Heading on the home page',
      type: 'string',
    }),
    defineField({
      name: 'siteTitle',
      description: 'Displayed in header, footer and in meta tags',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      description: 'Image in the hero section',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sectionImage',
      description: 'Image in the about section',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
