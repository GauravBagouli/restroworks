"use client";

import { SerializedEditorState } from "lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default function RichTextRenderer({
  content,
}: {
  content: SerializedEditorState | null;
}) {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      <RichText data={content} />
    </div>
  );
}
