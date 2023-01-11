import fs from 'fs'
import sharp from 'sharp'
import slugify from 'slugify'

const FORMATS = ['png', 'avif', 'webp']

const BASE = `${process.cwd()}/public/media/image/enhanced`

const getEnhancedPath = (img, prod = false) =>
  `${prod ? BASE.slice(BASE.indexOf('/public/') + 7) : BASE}/${img.src.slice(
    img.src.lastIndexOf('/') + 1,
    img.src.lastIndexOf('.')
  )}-${img.width}x${img.height}`

/**
 * This only takes the images and optimizes for the size in the Markup...
 * And it's only based on the first one it finds
 * */
export const enhanceImages = async (docs) => {
  // Grab the images to be enhanced
  const images = []
  docs.forEach(async ({ document }) => {
    const allImg = [...document.querySelectorAll('img[src]')]
    allImg.forEach((img) => {
      if (!images.find((i) => i.src === img.src))
        images.push({ src: img.src, el: img })
    })
  })
  // Now you have a unique set of images to enhance if required.
  for (const img of images) {
    if (!img.el.width || !img.el.height)
      return console.warn(
        `Image doesn't have height/width set: ${img.el.outerHTML}`
      )
    if (fs.existsSync(`${process.cwd()}/public${img.src}`))
      return console.info('Already pointing at optimised image')
    
    const destination = getEnhancedPath(img.el)
    const alreadyEnhanced = fs.existsSync(`${destination}.${FORMATS[0]}`)

    if (!alreadyEnhanced) {
      // If we need to grab the image, do that.
      const blob = !img.src.startsWith('/')
        ? await (await fetch(img.src)).arrayBuffer()
        : await fs.promises.readFile(img.src)
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
        newImg.toFormat(format).toFile(`${destination}.${format}`)
      })
    }
  }
}

// This is what we're trying to make from <img> elements
/**
 *
 * <picture class="site-header__me">
 *   <source type="image/avif" srcset="/assets/enhanced/d0f67a1f-384.avif 384w" sizes="384px">
 *   <source type="image/webp" srcset="/assets/enhanced/d0f67a1f-384.webp 384w" sizes="384px">
 *   <img src="/assets/enhanced/d0f67a1f-384.png" width="384" height="384" alt="Picture of Jhey on stage" loading="lazy" decoding="async">
 * </picture>
 * */
export const imageEnhancer = async (document) => {
  const allImg = [...document.querySelectorAll('img[src]')]

  // Just modify all the images... Swap the source for the enhanced path
  allImg.forEach(img => {
    const enhancedSrc = getEnhancedPath(img, true)
    if (img.src.includes('/media/image/enhanced/')) {
      console.info('<img> src already optimised')
    } else {
      img.src = `${enhancedSrc}.${FORMATS[0]}`
    }
    if (img.parentNode.tagName !== 'PICTURE') {
      const PICTURE = document.createElement('picture')
      let sourceString = ''
      for (let f = 1; f < FORMATS.length; f++) {
        const format = FORMATS[f]
        sourceString += `
          <source type="image/${format}" srcset="${enhancedSrc}.${format} ${img.width}w" sizes="${img.width}px">
        `
      }

      PICTURE.innerHTML = `
        ${sourceString}
        ${img.outerHTML}
      `
      img.replaceWith(PICTURE)
    }
    img.setAttribute('decoding', 'async')
    img.setAttribute('loading', 'lazy')
  })
  return document
}

export default imageEnhancer