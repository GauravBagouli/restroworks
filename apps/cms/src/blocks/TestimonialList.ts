import { Block } from 'payload';

const TestimonialList: Block = {
  slug: "testimonialList",
  labels: { singular: "Testimonial List", plural: "Testimonial Lists" },
  fields: [
    {
      name: "testimonials",
      type: "array",
      fields: [
        { name: "quote", type: "textarea", required: true, localized: true, },
        { name: "author", type: "text", required: true, localized: true, },
        { name: "role", type: "text", localized: true, },
        { name: "avatar", type: "upload", relationTo: "media" },
      ],
    },
  ],
};

export default TestimonialList;
