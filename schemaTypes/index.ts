import { defineField, defineType } from 'sanity'

export const schemaTypes = [
  defineType({
    name: 'whatIf',
    title: 'What If',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Question / title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'URL slug',
        type: 'slug',
        options: { source: 'title', maxLength: 96 },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'summary',
        title: 'Short summary',
        type: 'text',
        rows: 3,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'body',
        title: 'Full story',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'ripples',
        title: 'Ripple timeline',
        description: 'Three consequences that unfold over time. These power the Ripple Engine on the story page.',
        type: 'array',
        of: [
          {
            name: 'ripple',
            title: 'Ripple',
            type: 'object',
            fields: [
              defineField({
                name: 'horizon',
                title: 'When?',
                type: 'string',
                options: {
                  list: [
                    { title: 'The first day', value: 'The first day' },
                    { title: 'One year later', value: 'One year later' },
                    { title: 'Generations later', value: 'Generations later' },
                  ],
                },
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'consequence',
                title: 'What changes?',
                type: 'text',
                rows: 3,
                validation: (Rule) => Rule.required().min(20).max(240),
              }),
            ],
            preview: {
              select: { title: 'horizon', subtitle: 'consequence' },
            },
          },
        ],
        validation: (Rule) => Rule.max(3),
      }),
      defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
      }),
    ],
  }),
]
