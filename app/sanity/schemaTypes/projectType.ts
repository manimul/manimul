import { ComposeIcon, ImageIcon, MenuIcon, ThListIcon } from '@sanity/icons';
import { Disc } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: Disc,
  groups: [
    {
      name: 'intro',
      title: 'Introduction',
      icon: ComposeIcon,
    },
    {
      name: 'details',
      title: 'Details',
      icon: ThListIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'intro',
    }),
    defineField({
      name: 'extract',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'link',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: 'intro',
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),

    defineField({
      name: 'client',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'role',
      type: 'string',
      group: 'details',
    }),

    //genres => tech
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      group: 'details',
    }),

    //content => details
    defineField({
      name: 'details',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', icon: ImageIcon }),
      ],
      group: 'details',
    }),

    defineField({
      name: 'startDate',
      type: 'datetime',
      group: 'details',
    }),

    defineField({
      name: 'endDate',
      type: 'datetime',
      group: 'details',
    }),

    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string' }),
            defineField({ name: 'caption', type: 'string' }),
          ],
        },
      ],
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'image',
    },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client,
        media,
      };
    },
  },
});
