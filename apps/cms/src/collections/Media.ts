import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
  ],
};

export default Media;
