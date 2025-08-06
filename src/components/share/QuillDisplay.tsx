"use client";

import React from "react";

interface QuillHtmlContent {
  html: string;
  text?: string;
  length?: number;
}

export default function QuillDisplay({
  content,
}: {
  content: QuillHtmlContent;
}) {
  if (!content?.html) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <div
        className="text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content.html }}
        style={{
          color: "#d1d5db",
          fontFamily: "inherit",
        }}
      />
      {/* You can add custom styles here if needed */}
    </div>
  );
}
