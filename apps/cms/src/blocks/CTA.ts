import { Block } from 'payload';

const CTA: Block = {
  slug: "cta",
  labels: { singular: "Call to Action", plural: "CTAs" },
  fields: [
    { name: "headline", type: "text", required: true, localized: true, },
    {
      name: "buttons",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true, },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

export default CTA;
