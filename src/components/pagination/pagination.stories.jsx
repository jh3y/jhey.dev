import React from "react";

import Pagination from "./pagination.jsx";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Pagination",
  component: Pagination,
};

export const Default = () => <Pagination />;
