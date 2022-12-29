import React from 'react'

const Banner = () => {
  return (
    <div className="banner transform relative left-1/2 -translate-x-1/2 aspect-[3/1] bg-black p-8">
      <h2 className="text-right opacity-40 text-white">Nothing to<br/>see here.</h2>
      <iframe className="absolute inset-0 w-full h-full" loading="lazy" src="https://cdpn.io/pen/debug/NWdNMBJ"></iframe>
    </div>
  )
}

export default Banner