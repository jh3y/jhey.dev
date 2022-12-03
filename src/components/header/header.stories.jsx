import React from 'react';

import Header from './header.jsx';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Header',
  component: Header,
};

export const Default = () => <Header>Coool</Header>