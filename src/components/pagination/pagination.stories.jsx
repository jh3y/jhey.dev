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

export const OneOfTenPages = () => <Pagination current={1} total={10} prefix="/css" />;
export const TenOfTenPages = () => <Pagination current={10} total={10} prefix="/html" />;
export const FiveOfTenPages = () => <Pagination current={5} total={10} prefix="/html" />;
