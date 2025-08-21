import type { GlobalConfig } from 'payload';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'Navigation',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'footerText',
      type: 'textarea',
      localized: true,
    },
  ],
};

export default SiteSettings;
