import type { GlobalConfig } from 'payload';

const SeoDefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', required: true },
    { name: 'defaultTitle', type: 'text', required: true, localized: true },
    { name: 'defaultDescription', type: 'textarea', localized: true },
  ],
};

export default SeoDefaults;
