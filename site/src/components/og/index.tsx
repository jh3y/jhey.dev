import { ImageResponse } from '@vercel/og'
import fs from 'node:fs'
import path from 'node:path'

const OG = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingLeft: '50px',
          paddingRight: '50px',
          height: '25%',
        }}
      >
        <p
          style={{
            fontFamily: 'DM Serif',
            fontWeight: 700,
            color: 'hsl(240 3.8% 46.1%)',
            fontSize: '48px',
          }}
        >
          The Craft of UI
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          height: '75%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '50px',
          lineHeight: '1',
        }}
      >
        <h3
          style={{
            fontSize: '56px',
            marginBottom: '30px',
            fontWeight: 400,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'hsl(240 3.8% 46.1%)',
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}

const Inter = fs.readFileSync(
  path.join(process.cwd(), 'public/fonts/Inter_28pt-Regular.ttf'),
)
const DMSerif = fs.readFileSync(
  path.join(process.cwd(), 'public/fonts/DMSerifText-Regular.ttf'),
)

export const generateOG = ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) => {
  const og = new ImageResponse(<OG title={title} subtitle={subtitle} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: Inter,
        style: 'normal',
      },
      {
        name: 'DM Serif',
        data: DMSerif,
        style: 'normal',
      },
    ],
  })
  return og
}
