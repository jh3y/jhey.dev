import React from 'https://esm.sh/react@18.2.0'

import satori, { init as initSatori } from 'https://esm.sh/satori@0.0.40/wasm'
import { initStreaming } from 'https://esm.sh/yoga-wasm-web@0.1.2'

import { initWasm, Resvg } from 'https://esm.sh/@resvg/resvg-wasm@2.0.0-alpha.4'

const DIMENSIONS = {
  WIDTH: 1200,
  HEIGHT: 630,
}
const GRADIENTS = [
  'linear-gradient(45deg, #1f005c, #5b0060, #870160, #ac255e, #ca485c, #e16b5c, #f39060, #ffb56b)',
  'linear-gradient(-45deg, #48005c, #8300e2, #a269ff)',
  'linear-gradient(45deg, #00F5A0,#00D9F5)',
  'linear-gradient(45deg, #72C6EF,#004E8F)',
  'linear-gradient(45deg, #c7d2fe, #fecaca, #fef3c7)',
  'linear-gradient(45deg, #ffe259,#ffa751)',
  'linear-gradient(45deg, #acb6e5,#86fde8)',
  'linear-gradient(45deg, #536976,#292E49)',
  'linear-gradient(45deg, #9796f0,#fbc7d4)',
  'linear-gradient(90deg, #c6ffdd, #fbd786, #f7797d)',
  'linear-gradient(90deg, #77a1d3, #79cbca, #e684ae)',
  'linear-gradient(95deg,#c8beff 0%,#dea8f8 10%,#a8deff 30%,#bdfacd 42%,#f3fabd 58%,#fae3bd 70%,#f8acab 95%,#feaad4 100%)',
  'linear-gradient(75deg,red,orange,yellow,green,blue,indigo,violet)',
]

const resvg_wasm = fetch(
  'https://unpkg.com/@vercel/og@0.0.18/vendor/resvg.simd.wasm'
).then((res) => res.arrayBuffer())

const yoga_wasm = fetch('https://unpkg.com/@vercel/og@0.0.18/vendor/yoga.wasm')

const initializedResvg = initWasm(resvg_wasm)
const initializedYoga = initStreaming(yoga_wasm).then((yoga) =>
  initSatori(yoga)
)

const isDev = Boolean(Deno.env.get('NETLIFY_LOCAL'))

async function loadGoogleFont(font, weight = 900) {
  if (!font) return

  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (!resource) throw new Error('Failed to load font')

  return fetch(resource[1]).then((res) => res.arrayBuffer())
}

const desiredFont = loadGoogleFont('Inter')

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Hello world!'
    // ?hue=<hue>
    const hasHue = searchParams.has('hue')
    const hue = hasHue ? searchParams.get('hue') : 5

    const hasGradient = searchParams.has('gradient')

    let background = `hsl(${hue} 80% 50%)`
    if (hasGradient) background = GRADIENTS[searchParams.get('gradient')]

    const extendedOptions = Object.assign(
      {
        width: DIMENSIONS.WIDTH,
        height: DIMENSIONS.HEIGHT,
        debug: false,
      },
      {}
    )

    const element = (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          padding: '2rem',
          background,
        }}
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: DIMENSIONS.WIDTH,
            height: DIMENSIONS.HEIGHT,
          }}
        >
          {/* This is the backdrop cutout */}
          <svg
            viewBox={`0 0 ${DIMENSIONS.WIDTH} ${DIMENSIONS.HEIGHT}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: DIMENSIONS.WIDTH,
              height: DIMENSIONS.HEIGHT,
            }}
          >
            {/* This is a precut backdrop */}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 24C10 16.2681 16.2681 10 24 10H1176C1183.73 10 1190 16.2681 1190 24V263.195C1170.85 259.781 1151.13 258 1131 258C946.537 258 797 407.537 797 592C797 601.43 797.391 610.768 798.157 620H24C16.2681 620 10 613.732 10 606V24ZM1173.66 173.153H1153.36V180.21H1173.51C1174.08 180.21 1174.5 180.368 1174.75 180.683C1175.02 180.99 1175.15 181.565 1175.15 182.409C1175.15 182.537 1175.14 182.661 1175.13 182.78C1175.13 182.908 1175.11 183.057 1175.1 183.227H1180.31C1180.33 182.963 1180.34 182.72 1180.35 182.499C1180.36 182.376 1180.36 182.247 1180.36 182.111C1180.36 182.01 1180.36 181.904 1180.36 181.795C1180.36 180.065 1180.16 178.553 1179.76 177.257C1179.36 175.962 1178.68 174.956 1177.7 174.24C1176.73 173.516 1175.39 173.153 1173.66 173.153ZM1150.37 179.136C1151 178.455 1151.32 177.636 1151.32 176.682C1151.32 175.719 1151 174.901 1150.37 174.227C1149.74 173.545 1148.98 173.205 1148.1 173.205C1147.21 173.205 1146.45 173.545 1145.82 174.227C1145.19 174.901 1144.88 175.719 1144.88 176.682C1144.88 177.636 1145.19 178.455 1145.82 179.136C1146.45 179.818 1147.21 180.159 1148.1 180.159C1148.98 180.159 1149.74 179.818 1150.37 179.136ZM1173 162.501H1161.95C1161.31 162.493 1160.75 162.373 1160.29 162.143C1159.82 161.904 1159.47 161.572 1159.22 161.146C1158.96 160.711 1158.84 160.208 1158.84 159.637C1158.84 158.734 1159.11 158.039 1159.67 157.554C1160.22 157.059 1160.98 156.816 1161.95 156.825H1173V149.768H1160.47C1159.04 149.76 1157.77 150.041 1156.66 150.612C1155.55 151.174 1154.68 151.971 1154.05 153.002C1153.42 154.025 1153.11 155.231 1153.11 156.62C1153.11 158.069 1153.46 159.309 1154.17 160.341C1154.87 161.372 1155.84 162.109 1157.1 162.552V162.757H1146.82V169.558H1173V162.501ZM1172.16 142.296C1172.96 140.779 1173.36 138.972 1173.36 136.875C1173.36 135.06 1173.09 133.475 1172.54 132.12C1171.99 130.756 1171.21 129.661 1170.21 128.834C1169.21 128.007 1168.02 127.483 1166.66 127.262V133.705C1167.03 133.841 1167.34 134.054 1167.61 134.344C1167.86 134.634 1168.06 134.983 1168.19 135.392C1168.33 135.793 1168.4 136.236 1168.4 136.722C1168.4 137.421 1168.26 138.017 1167.98 138.512C1167.69 139.006 1167.31 139.385 1166.81 139.65C1166.32 139.914 1165.76 140.046 1165.12 140.046H1164.82V127.262H1163.18C1161.62 127.262 1160.22 127.492 1158.98 127.952C1157.73 128.412 1156.67 129.069 1155.81 129.921C1154.93 130.773 1154.26 131.8 1153.8 133.002C1153.34 134.203 1153.11 135.546 1153.11 137.029C1153.11 139.057 1153.53 140.817 1154.37 142.309C1155.22 143.8 1156.4 144.955 1157.91 145.773C1159.43 146.591 1161.2 147 1163.23 147C1165.35 147 1167.16 146.596 1168.68 145.786C1170.19 144.968 1171.35 143.804 1172.16 142.296ZM1160.93 133.756V140.046C1160.36 140.029 1159.86 139.88 1159.44 139.598C1159.01 139.309 1158.68 138.925 1158.44 138.448C1158.19 137.971 1158.07 137.446 1158.07 136.875C1158.07 136.287 1158.19 135.763 1158.44 135.303C1158.68 134.834 1159.01 134.463 1159.45 134.191C1159.88 133.909 1160.37 133.765 1160.93 133.756ZM1180.17 122.893C1180.3 122.16 1180.36 121.388 1180.36 120.579C1180.36 118.934 1180.11 117.562 1179.61 116.462C1179.11 115.363 1178.42 114.477 1177.55 113.803C1176.69 113.121 1175.72 112.602 1174.64 112.244L1153.36 105.085V112.499L1166.97 115.721V115.925L1153.36 119.096V126.46L1173.87 119.556L1174.23 119.71C1174.59 119.863 1174.83 120.114 1174.96 120.464C1175.08 120.805 1175.12 121.218 1175.06 121.704C1175 122.181 1174.87 122.71 1174.66 123.289L1179.67 124.823C1179.89 124.269 1180.05 123.626 1180.17 122.893ZM1172.37 103.017C1173.06 102.309 1173.41 101.461 1173.41 100.473C1173.41 99.842 1173.25 99.2582 1172.94 98.7212C1172.61 98.1843 1172.18 97.7496 1171.64 97.4173C1171.1 97.0763 1170.49 96.9016 1169.83 96.8931C1168.86 96.9016 1168.03 97.2681 1167.34 97.9925C1166.65 98.7085 1166.3 99.5352 1166.3 100.473C1166.3 101.461 1166.65 102.309 1167.34 103.017C1168.03 103.716 1168.86 104.061 1169.83 104.052C1170.83 104.061 1171.67 103.716 1172.37 103.017ZM1172.16 89.8107C1172.89 88.6346 1173.26 87.3477 1173.26 85.9499C1173.26 85.0295 1173.11 84.2113 1172.81 83.4954C1172.5 82.771 1172.09 82.1573 1171.57 81.6545C1171.04 81.1431 1170.44 80.7511 1169.78 80.4783V80.3249H1173V73.3192H1146.82V80.3761H1156.79V80.4783C1156.12 80.734 1155.52 81.109 1154.96 81.6033C1154.4 82.0977 1153.95 82.7113 1153.62 83.4442C1153.28 84.1772 1153.11 85.0295 1153.11 86.0011C1153.11 87.2965 1153.45 88.5323 1154.14 89.7085C1154.83 90.8761 1155.92 91.8306 1157.4 92.5721C1158.89 93.305 1160.81 93.6715 1163.18 93.6715C1165.45 93.6715 1167.33 93.3221 1168.82 92.6232C1170.31 91.9158 1171.42 90.9783 1172.16 89.8107ZM1167.27 81.68C1167.65 82.1403 1167.84 82.6942 1167.84 83.342C1167.84 83.9897 1167.65 84.5437 1167.29 85.0039C1166.91 85.4556 1166.38 85.805 1165.69 86.0522C1164.99 86.2908 1164.15 86.4102 1163.18 86.4102C1162.21 86.4102 1161.38 86.2908 1160.69 86.0522C1159.99 85.805 1159.46 85.4556 1159.09 85.0039C1158.72 84.5437 1158.53 83.9897 1158.53 83.342C1158.53 82.6942 1158.72 82.1403 1159.09 81.68C1159.46 81.2113 1159.99 80.8533 1160.69 80.6062C1161.38 80.3505 1162.21 80.2227 1163.18 80.2227C1164.14 80.2227 1164.96 80.3505 1165.66 80.6062C1166.35 80.8533 1166.89 81.2113 1167.27 81.68ZM1172.16 65.8661C1172.96 64.3491 1173.36 62.5423 1173.36 60.4457C1173.36 58.6303 1173.09 57.0451 1172.54 55.69C1171.99 54.3263 1171.21 53.2312 1170.21 52.4045C1169.21 51.5778 1168.02 51.0536 1166.66 50.832V57.2752C1167.03 57.4116 1167.34 57.6246 1167.61 57.9144C1167.86 58.2042 1168.06 58.5536 1168.19 58.9627C1168.33 59.3633 1168.4 59.8065 1168.4 60.2923C1168.4 60.9911 1168.26 61.5877 1167.98 62.082C1167.69 62.5763 1167.31 62.9556 1166.81 63.2198C1166.32 63.484 1165.76 63.6161 1165.12 63.6161H1164.82L1164.82 50.832H1163.18C1161.62 50.832 1160.22 51.0621 1158.98 51.5224C1157.73 51.9826 1156.67 52.6388 1155.81 53.4911C1154.93 54.3434 1154.26 55.3704 1153.8 56.5721C1153.34 57.7738 1153.11 59.1161 1153.11 60.5991C1153.11 62.6275 1153.53 64.3874 1154.37 65.8789C1155.22 67.3704 1156.4 68.5252 1157.91 69.3434C1159.43 70.1616 1161.2 70.5707 1163.23 70.5707C1165.35 70.5707 1167.16 70.1658 1168.68 69.3562C1170.19 68.538 1171.35 67.3746 1172.16 65.8661ZM1160.93 57.3263V63.6161C1160.36 63.5991 1159.86 63.4499 1159.44 63.1687C1159.01 62.8789 1158.68 62.4954 1158.44 62.0181C1158.19 61.5408 1158.07 61.0167 1158.07 60.4457C1158.07 59.8576 1158.19 59.3335 1158.44 58.8732C1158.68 58.4045 1159.01 58.0337 1159.45 57.761C1159.88 57.4798 1160.37 57.3349 1160.93 57.3263ZM1173 35.2514L1153.36 28.6548V36.0696L1166.35 39.2401V39.4446L1153.36 42.6151V50.0298L1173 43.4332V35.2514Z"
              fill="#262626"
            />
          </svg>
        </div>
        <div style={{ display: 'flex', position: 'relative', padding: '1rem' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '900',
              color: 'hsl(0 0% 100%)',
              textTransform: 'uppercase',
              position: 'relative',
              width: '85%',
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div
            style={{
              position: 'absolute',
              width: '350px',
              height: '16px',
              background: `hsl(0 0% 100%)`,
              bottom: '-1rem',
              left: '1rem',
              zIndex: -1,
            }}
          ></div>
        </div>
        <img
          style={{
            position: 'absolute',
            height: '75%',
            right: 0,
            bottom: 0,
            transform: 'translate(5%, 5%)',
            filter: 'saturate(0.5) grayscale(0.5)',
          }}
          src="https://assets.codepen.io/605876/headshot-remove-bg.png"
          alt=""
        />
      </div>
    )

    const result = new ReadableStream({
      async start(controller) {
        await initializedYoga
        await initializedResvg

        const fontData = await desiredFont

        const svg = await satori(element, {
          width: extendedOptions.width,
          height: extendedOptions.height,
          debug: extendedOptions.debug,
          fonts: extendedOptions.fonts || [
            {
              name: 'Inter',
              data: fontData,
              weight: 900,
              style: 'bold',
            },
          ],
        })

        const result = new Resvg(svg, {
          fitTo: {
            mode: 'width',
            value: extendedOptions.width,
          },
        }).render()

        controller.enqueue(result)
        controller.close()
      },
    })

    return new Response(result, {
      headers: {
        'content-type': 'image/png',
        'cache-control': isDev
          ? 'no-cache, no-store'
          : 'public, immutable, no-transform, max-age=31536000',
        ...extendedOptions.headers,
      },
      status: extendedOptions.status,
      statusText: extendedOptions.statusText,
    })
  } catch (err) {
    console.log(`${err.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
