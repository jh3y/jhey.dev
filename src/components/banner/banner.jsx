import React from 'react'

const Banner = ({ bannerDemo, bannerAlt }) => {
  return (
    <div className="banner max-w-[100vw] transform relative left-1/2 -translate-x-1/2 aspect-[3/1] bg-surface-4">
      <iframe title={bannerAlt} className="w-full h-full" loading="lazy" src={bannerDemo}></iframe>
    </div>
  )
}

export default Banner