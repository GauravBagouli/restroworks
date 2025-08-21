import Hero from "./blocks/Hero";
import FeatureList from "./blocks/FeatureList";
import TestimonialList from "./blocks/TestimonialList";
import CTA from "./blocks/CTA";

const blockComponents: Record<string, any> = {
  hero: Hero,
  featureList: FeatureList,
  testimonialList: TestimonialList,
  cta: CTA,
};

export default function RenderBlocks({ layout }: { layout: any[] }) {
  return (
    <>
      {layout?.map((block, i) => {
        const Block = blockComponents[block.blockType];
        if (!Block) return null;
        return <Block key={block.id || i} block={block} />;
      })}
    </>
  );
}
