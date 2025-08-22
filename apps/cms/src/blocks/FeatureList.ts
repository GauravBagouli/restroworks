import { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const FeatureList: Block = {
  slug: "featureList",
  labels: { singular: "Feature List", plural: "Feature Lists" },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({}),
      localized: true,
    },
    {
      name: "features",
      type: "relationship",
      relationTo: "features",
      hasMany: true,
      required: true,
    },
  ],
};

export default FeatureList;
