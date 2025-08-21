import { CollectionConfig } from 'payload';
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const Features: CollectionConfig = {
  slug: 'features',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({}),
      localized: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        { name: "caption", type: "text", required: true, localized: true, },
      ],
    },
    {
      name: "link_label",
      type: "text",
      label: "Link Label",
      required: true,
      localized: true,
    },
    {
      name: "link",
      type: "text",
      label: "Custom Link",
      required: false,
      admin: {
        description: "Optional: External or internal link for the feature",
        placeholder: "/features/feature-slug",
      },
    },
  ],
};

export default Features;
