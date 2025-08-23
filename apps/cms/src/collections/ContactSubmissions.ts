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
      required: false,
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        if (!/^\d+$/.test(value)) return "Phone must contain only digits";
        if (value.length < 10) return "Phone must be at least 10 digits";
        if (value.length > 15) return "Phone must be at most 15 digits";
        return true;
      },
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
