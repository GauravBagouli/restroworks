import { CollectionConfig } from "payload";

const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: { useAsTitle: "email" },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    update: () => false,
    delete: () => false,
    create: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      minLength: 10,
      maxLength: 15,
      required: false,
    },
    {
      name: "honey",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
};

export default ContactSubmissions;
