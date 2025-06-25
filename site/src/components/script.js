// import { gsap } from 'gsap'
// import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

// gsap.registerPlugin(ScrambleTextPlugin)
// console.info('what', gsap, ScrambleTextPlugin)

// gsap.to('.scramble-text', {
//   text: 'Hello, world!',
//   duration: 1,
//   ease: 'power2.inOut',
// })

// const response = await fetch('/api/status')
// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`)
// }

// const dataLoaded = await response.json()
// console.info({ dataLoaded })

// const steamStatus = document.querySelector('[data-platform="steam"]')
// if (steamStatus) {
//   gsap.to(steamStatus, {
//     scrambleText: dataLoaded.steam.last_game.name,
//     duration: 1,
//     ease: 'power2.inOut',
//   })
//   gsap.to('[data-platform="spotify"] marquee', {
//     scrambleText: `${dataLoaded.spotify.track.name} – ${dataLoaded.spotify.track.artists}`,
//     duration: 1,
//     ease: 'power2.inOut',
//   })
// }