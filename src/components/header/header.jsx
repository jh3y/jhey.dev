import React from 'react'
const LayoutHeader = ({ children }) => {
  React.useEffect(() => {
    console.info('hello world!')
  })
  return (
    <header>
      <h1 className="text-red-800 text-xxl">{children}</h1>
      <span>Hello? Is this thing on?!!!!</span>
    </header>
  )
}

export default LayoutHeader