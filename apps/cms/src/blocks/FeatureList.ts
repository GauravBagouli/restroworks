import { Block } from "payload";

const FeatureList: Block = {
  slug: "featureList",
  labels: { singular: "Feature List", plural: "Feature Lists" },
  fields: [
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
