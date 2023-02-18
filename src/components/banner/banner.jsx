import React from 'react'

const Banner = ({ bannerDemo, bannerAlt }) => {
  return (
    <div className="col-span-full aspect-[3/1] bg-surface-4">
      {bannerDemo && bannerAlt && (
        <iframe
          title={bannerAlt}
          className="w-full h-full"
          loading="lazy"
          src={bannerDemo}
        ></iframe>
      )}
    </div>
  )
}

export default Banner