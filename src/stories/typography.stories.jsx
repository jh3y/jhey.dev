import React from 'react'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Typography',
}

export const Default = () => (
  <>
    <h1>heading1</h1>
    <h2>heading2</h2>
    <h3>heading3</h3>
    <h4>heading4</h4>
    <h5>heading5</h5>
    <h6>heading6</h6>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ipsa
      sequi quibusdam doloremque, minima sit mollitia atque ad error ut? Magnam
      reprehenderit fugiat quis delectus nobis animi. Sunt, ut, itaque!
    </p>
  </>
)
