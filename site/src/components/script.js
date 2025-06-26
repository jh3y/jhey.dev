import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

// const data = await fetch('/api/status')
// const dataLoaded = await data.json()
// console.info({ dataLoaded })

gsap.to('[data-status]', {
  scrambleText: {
    text: function (index) {
      return this.targets()[index].dataset.status
    },
    chars: function (index) {
      return this.targets()[index].dataset.chars
    },
  },
  ease: 'power2.inOut',
})
