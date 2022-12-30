import React from 'react'

const Banner = () => {
  return (
    <div className="banner max-w-[100vw] transform relative left-1/2 -translate-x-1/2 aspect-[3/1] bg-black p-8">
      <h2 className="text-right opacity-40 text-white">Nothing to<br/>see here.</h2>
      <iframe title="One of Jhey's demos" className="absolute inset-0 w-full h-full" loading="lazy" src="https://cdpn.io/pen/debug/NWdNMBJ"></iframe>
    </div>
  )
}

export default Banner