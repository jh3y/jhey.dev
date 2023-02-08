import fs from 'fs'
import sharp from 'sharp'
import slugify from 'slugify'

const FORMATS = ['png', 'avif', 'webp']

const BASE = `${process.cwd()}/public/media/image/enhanced`
const DIST = `${process.cwd()}/dist/media/image/enhanced`

const getEnhancedPath = (el, prod = false) => {
  const SRC = el.tagName === 'VIDEO' ? el.poster : el.src

  const IS_LOCAL = SRC.startsWith('/')

  let enhanced
  if (IS_LOCAL) {
    enhanced = `${
      prod ? BASE.slice(BASE.indexOf('/public/') + 7) : BASE
    }/${slugify(SRC.slice(SRC.lastIndexOf('image/') + 6, SRC.lastIndexOf('.')))}-${
      el.width
    }x${el.height}`
  } else {
    enhanced = `${
      prod ? BASE.slice(BASE.indexOf('/public/') + 7) : BASE
    }/${slugify(SRC.slice(0, SRC.lastIndexOf('.')))}-${el.width}x${
      el.height
    }`.replace('https:', '')
  }
  return enhanced
}

/**
 * This only takes the images and optimizes for the size in the Markup...
 * And it's only based on the first one it finds
 * */
export const enhanceImages = async (docs) => {
  if (!fs.existsSync(BASE)) fs.mkdirSync(BASE)
  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST)
  // Grab the images to be enhanced
  const images = []
  docs.forEach(async ({ document }) => {
    // Let's try including video...
    const allMedia = [
      ...document.querySelectorAll('img[src]'),
      ...document.querySelectorAll('video[poster]'),
    ]
    allMedia.forEach((el) => {
      // If it's an enhanced image, ignore it.
      if (
        el.src.includes('/media/image/enhanced/') ||
        (el.tagName === 'VIDEO' && el.poster.includes('/media/image/enhanced/'))
      )
        return
      // This is incorrect. Should be worked out on destination...
      const enhancedPath = getEnhancedPath(el)
      if (!images.find((i) => i.destination === enhancedPath))
        images.push({
          src: el.tagName === 'VIDEO' ? el.poster : el.src,
          el,
          destination: enhancedPath,
        })
    })
  })
  // Now you have a unique set of images to enhance if required.
  for (const img of images) {
    if (!img.el.width || !img.el.height)
      return console.warn(
        `Image doesn't have height/width set: ${img.el.outerHTML}`
      )

    const testPath = `${img.destination}.${FORMATS[0]}`
    const alreadyEnhanced = fs.existsSync(testPath)

    if (!alreadyEnhanced) {
      // If we need to grab the image, do that.
      const blob = !img.src.startsWith('/')
        ? await (await fetch(img.src)).arrayBuffer()
        : await fs.promises.readFile(`${process.cwd()}/public${img.src}`)
      // Process image using img attributes
      console.info('generating', img.src)
      const newImg = await sharp(new Uint8Array(blob)).resize(
        img.el.width,
        img.el.height,
        {
          fit: 'cover',
          position: 'attention',
        }
      )
      // Loop over the formats and save to disk...
      FORMATS.forEach((format) => {
        const newFormat = newImg.toFormat(format)
        newFormat.toFile(`${img.destination}.${format}`)
        /**
         * If it's the first time enhancing, make sure we push it to the
         * dist folder too!
         * */
        newFormat.toFile(
          `${img.destination.replace('public', 'dist')}.${format}`
        )
      })
    }
  }
}

/**
 * This is what we're trying to make from <img> elements
 *
 * <picture class="site-header__me">
 *   <source type="image/avif" srcset="/assets/enhanced/d0f67a1f-384.avif 384w" sizes="384px">
 *   <source type="image/webp" srcset="/assets/enhanced/d0f67a1f-384.webp 384w" sizes="384px">
 *   <img src="/assets/enhanced/d0f67a1f-384.png" width="384" height="384" alt="Picture of Jhey on stage" loading="lazy" decoding="async">
 * </picture>
 * */
export const imageEnhancer = async (document) => {
  const allMedia = [
    ...document.querySelectorAll('img[src]'),
    ...document.querySelectorAll('video[poster]'),
  ]

  // Just modify all the images... Swap the source for the enhanced path
  allMedia.forEach((el) => {
    const enhancedSrc = getEnhancedPath(el, true)
    if (el.tagName === 'VIDEO') {
      el.poster = `${enhancedSrc}.png`
    } else {
      el.setAttribute('decoding', 'async')
      el.setAttribute('loading', el.getAttribute('loading') || 'lazy')
      if (!el.src.includes('/media/image/enhanced/')) {
        el.src = `${enhancedSrc}.${FORMATS[0]}`
      }
      if (el.parentNode.tagName !== 'PICTURE') {
        const PICTURE = document.createElement('picture')
        let sourceString = ''
        for (let f = 1; f < FORMATS.length; f++) {
          const format = FORMATS[f]
          sourceString += `
            <source type="image/${format}" srcset="${enhancedSrc}.${format} ${el.width}w" sizes="${el.width}px">
          `
        }
        PICTURE.innerHTML = `
          ${sourceString}
          ${el.outerHTML}
        `
        el.replaceWith(PICTURE)
      }
    }
  })
  return document
}

export default imageEnhancer
