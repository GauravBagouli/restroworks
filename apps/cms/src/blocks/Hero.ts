import { Block } from 'payload';
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const Hero: Block = {
  slug: 'hero',
  labels: { singular: "Hero", plural: "Heros" },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true, localized: true, },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
};

export default Hero;
