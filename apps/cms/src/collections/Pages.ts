import { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import Hero from '../blocks/Hero';
import FeatureList from '../blocks/FeatureList';
import TestimonialList from '../blocks/TestimonialList';
import CTA from '../blocks/CTA';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, localized: true, },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Hero, FeatureList, TestimonialList, CTA],
      localized: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', required: true, localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'metaKeywords', type: 'text', localized: true },
        { name: 'openGraphImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};

export default Pages;
