import Hero from "./blocks/Hero";
import FeatureList from "./blocks/FeatureList";
import TestimonialList from "./blocks/TestimonialList";
import CTA from "./blocks/CTA";
import { SerializedEditorState } from "lexical";

type BaseBlock = {
  id?: string | number;
  blockType: "hero" | "featureList" | "testimonialList" | "cta";
};

export type HeroBlock = {
  id?: string | number;
  blockType: "hero";
  eyebrow?: string;
  headline: string;
  description?: SerializedEditorState;
  primaryCta?: {
    href: string;
    label: string;
  };
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
};

export type FeatureListBlock = BaseBlock & {
  blockType: "featureList";
  title: string;
  description?: SerializedEditorState;
  features: { 
    id?: string | number;
    title: string; 
    description: string;
    icon?: { url: string; alt?: string };
    link?: string;
    link_label?: string;
  }[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
};

export type TestimonialListBlock = {
  id?: string | number;
  blockType: "testimonialList";
  title: string;
  testimonials: Testimonial[];
};

export type CTABlock = BaseBlock & {
  blockType: "cta";
  headline: string;
  buttons?: { href: string; label: string }[];
};

export type AnyBlock = HeroBlock | FeatureListBlock | TestimonialListBlock | CTABlock;

type BlockProps<T extends AnyBlock> = {
  block: T;
  locale: string;
};

type BlockTypeMap = {
  hero: HeroBlock;
  featureList: FeatureListBlock;
  testimonialList: TestimonialListBlock;
  cta: CTABlock;
};

const blockComponents: {
  [K in keyof BlockTypeMap]: React.ComponentType<BlockProps<BlockTypeMap[K]>>;
} = {
  hero: Hero,
  featureList: FeatureList,
  testimonialList: TestimonialList,
  cta: CTA,
};


export default function RenderBlocks({ layout, locale }: { layout: AnyBlock[], locale: string }) {
  return (
    <>
      {layout?.map((block, i) => {
        const Block = blockComponents[block.blockType] as React.ComponentType<
          BlockProps<BlockTypeMap[typeof block["blockType"]]>
        >;
        return <Block key={block.id || i} block={block as BlockTypeMap[typeof block.blockType]} locale={locale} />;
      })}
    </>
  );
}
