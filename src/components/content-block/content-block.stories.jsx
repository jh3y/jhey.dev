import React from "react";

import ContentBlock from "./content-block.jsx";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Content Block",
  component: ContentBlock,
};

export const Default = () => <ContentBlock />;
