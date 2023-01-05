import React from "react";

import Banner from "./banner.jsx";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Banner",
  component: Banner,
};

const props = {
  bannerDemo: "https://cdpn.io/pen/debug/NWdNMBJ",
  bannerAlt: "Jhey's CSS Plane demo"
}

export const Default = () => <Banner />;

export const WithCodepenDemo = () => <Banner {...props} />;
