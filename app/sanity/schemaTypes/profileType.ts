import { Home } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      description: 'Headline goes here',
      type: 'string',
    }),

    defineField({
      name: 'image',
      description: 'My profile image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      description: 'My profile content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'email',
      description: 'My email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      description: 'My phone number',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      description: 'My LinkedIn profile',
      type: 'string',
    }),
    defineField({
      name: 'github',
      description: 'My GitHub profile',
      type: 'string',
    }),
    defineField({
      name: 'experience',
      description: 'My experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'employer', type: 'string' },
            { name: 'link', type: 'string' },
            { name: 'startDate', type: 'date' },
            { name: 'endDate', type: 'date' },
            { name: 'description', type: 'array', of: [{ type: 'block' }] },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
