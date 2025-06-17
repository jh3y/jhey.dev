import { ImageResponse } from '@vercel/og'
import fs from 'node:fs'
import path from 'node:path'

const OG = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <div
        style={{
          backgroundImage:
            'linear-gradient(90deg,#0000 59px 59px,hsl(0 0% 70%) 59px 60px), linear-gradient(0deg,#0000 59px 59px,hsl(0 0% 70%) 59px 60px)',
          backgroundSize: '60px 60px, 60px 60px',
          backgroundPosition: '12px 0, 0 12px',
          backgroundColor: 'hsl(0 0% 98%)',
          position: 'absolute',
          height: '100%',
          width: '100%',
          maskImage: 'linear-gradient(-20deg, #0000 50%, #fff);',
        }}
      />
      <svg
        style={{
          color: 'hsl(0 0% 20%)',
          width: '48px',
          height: '48px',
          position: 'absolute',
          top: '20px',
          left: '18px',
        }}
        viewBox="0 0 969 955"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="161.191"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="806.809"
          cy="320.191"
          r="133.191"
          stroke="currentColor"
          stroke-width="20"
        ></circle>
        <circle
          cx="695.019"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <circle
          cx="272.981"
          cy="587.733"
          r="31.4016"
          fill="currentColor"
        ></circle>
        <path
          d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
          fill="currentColor"
        ></path>
        <rect
          x="310.42"
          y="448.31"
          width="343.468"
          height="51.4986"
          fill="#FF1E1E"
        ></rect>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
          fill="currentColor"
        ></path>
      </svg>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2rem',
          padding: '64px 128px',
          height: '100%',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter Regular',
            fontWeight: 700,
            color: 'hsl(0 0% 20%)',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '80px',
            lineHeight: 0.9,
            padding: '2rem .2rem',
          }}
        >
          <div>the one who</div>
          <div
            style={{
              backgroundImage:
                'linear-gradient(#ff6467, #ff6467), linear-gradient(hsl(0 0% 20%), hsl(0 0% 20%))',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '230px 100px, 100% 100%',
              backgroundPosition: '0 0',
              backgroundClip: 'text',
              color: '#0000',
            }}
          >
            crafts.
          </div>
        </div>
      </div>
      <img src="https://jhey.dev/headshot-og.png" style={{
        height: '120%',
        objectFit: 'cover',
        position: 'absolute',
        right: -40,
        bottom: -20,
        opacity: 1,
        filter: 'contrast(0.75)'
      }} />
    </div>
  )
}

const Geist = fs.readFileSync(
  path.join(process.cwd(), 'public/fonts/Geist-SemiBold.ttf'),
)

export const generateOG = ({ title }: { title: string }) => {
  const og = new ImageResponse(<OG title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Geist',
        data: Geist,
        style: 'normal',
      },
    ],
  })
  return og
}
