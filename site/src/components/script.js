import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

// const data = await fetch('/api/status')
// const dataLoaded = await data.json()
// console.info({ dataLoaded })

const reveals = gsap.utils.toArray('[data-status]')

gsap.to(reveals, {
  onComplete: function () {
    document.querySelectorAll('[data-marquee]').forEach((el) => {
      el.dataset.unscrambled = true
    })
  },
  scrambleText: {
    text: function (index) {
      const status = reveals[index].dataset.status
      console.info({ status })
      return reveals[index].dataset.status
    },
    chars: function (index) {
      return reveals[index].dataset.chars
    },
  },
  delay: function(index) {
    console.info({ index })
    return 1 + index * 0.125
  },
  duration: 1,
  ease: 'power2.out',
})
