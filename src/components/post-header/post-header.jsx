import React from 'react'
import Banner from '../banner/banner.jsx'
import ContentBlock from '../content-block/content-block.jsx'

const getReadingTime = content => {
  const WPM = 350
  let result = {};
  const regex=/\w+/g;
  result.wordCount = content.match(regex).length;
  result.readingTime = Math.ceil(result.wordCount / WPM);
  return result;
}

const LayoutHeader = ({ character, ...props }) => {
  const readingTime = getReadingTime(props.body)
  
  return (
    <header className="w-article max-w-full mx-auto grid gap-2 px-4 mb-12">
      <div className="">
        <div className="banner max-w-[100vw] transform relative left-1/2 -translate-x-1/2 aspect-[3/1] bg-surface-4">
          {/* Gets funky here... If there's a demo, do that. Else do an image */}
          {props?.hero?.demo && (
            <>
              {props.hero.image && <img width="750" height="250" className="motion-safe:hidden absolute inset-0 w-full h-full" src={props.hero.image} alt="Result demo for this post" />}
              <iframe title="Result demo for this post" className="hidden motion-safe:block absolute inset-0 w-full h-full" loading="lazy" src={props.hero.demo}></iframe>
            </>
          )}
        </div>
        <div className="relative flex justify-end items-center min-h-half-avatar py-2">
          <img
            className="absolute top-0 transform -translate-y-1/2 left-0 rounded-full bg-surface-4 aspect-square w-avatar border-4 border-text-1"
            src={character.avatar}
            alt={character.name}
            width="200"
            height="200"
          />
          <a
            href={props.shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:no-underline border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-4 rounded-full text-fluid--1 flex gap-x-1 items-center text-white bg-brand-fill px-3 py-1"
          >
            <span className="font-bold">Share</span>
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24" role="img">
              <title>Twitter icon</title>
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
          </a>
        </div>
      </div>
      {/* Actions Row [ Avatar + Follow RSS Button] */}
      <h1 className="text-fluid-4 font-bold">
        {props.title}
      </h1>
      <h2 className="text-fluid-0 text-text-3 flex gap-x-2 items-center mb-2">
        <span>{`${character.name}`}</span>
        {character.verified && (
          <span className="w-4 w-4 inline-block">
            <svg
              viewBox="0 0 750 750"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M494.195 662.762C541.279 687.206 600.656 679.674 640.165 640.165C679.674 600.656 687.206 541.279 662.762 494.195C713.34 478.186 750 430.874 750 375C750 319.126 713.34 271.814 662.762 255.805C687.206 208.721 679.674 149.344 640.165 109.835C600.656 70.326 541.279 62.7937 494.195 87.2381C478.186 36.6595 430.874 0 375 0C319.126 0 271.814 36.6596 255.805 87.2381C208.721 62.7937 149.344 70.326 109.835 109.835C70.326 149.344 62.7937 208.721 87.2381 255.805C36.6596 271.814 0 319.126 0 375C0 430.874 36.6596 478.186 87.2381 494.195C62.7937 541.279 70.326 600.656 109.835 640.165C149.344 679.674 208.721 687.206 255.805 662.762C271.814 713.34 319.126 750 375 750C430.874 750 478.186 713.34 494.195 662.762ZM116 289.841C116 325.908 139.763 356.389 172.52 366.829C170.618 376.272 169.644 385.705 169.644 394.907H301.477V388.362H448.32V394.907H580.806C580.806 385.249 579.733 375.337 577.64 365.425C610.238 355.565 634 325.488 634 289.841C634 246.157 598.316 210.838 554.414 210.838C525.12 210.838 499.484 226.563 485.668 250.006C452.922 233.407 414.658 224.39 375.225 224.39C336.88 224.39 299.64 232.916 267.505 248.65C253.308 224.896 227.211 209 197.425 209C152.521 209 116 245.129 116 289.841ZM197.425 227.379C162.545 227.379 134.388 255.409 134.388 289.841C134.388 317.289 152.281 340.669 177.21 349.024C186.635 320.107 204.629 292.396 229.857 272.315C236.613 266.938 243.79 261.974 251.328 257.443C240.282 239.433 220.299 227.379 197.425 227.379ZM446.779 360.115H303.018C306.737 349.679 316.77 342.202 328.564 342.202H421.233C433.027 342.202 443.061 349.679 446.779 360.115ZM619.29 289.841C619.29 318.579 600.247 342.969 573.927 351.183C564.705 321.49 546.448 292.895 520.593 272.315C513.67 266.805 506.305 261.729 498.563 257.108C509.854 238.223 530.619 225.541 554.414 225.541C590.296 225.541 619.29 254.381 619.29 289.841ZM509.964 436.589C509.964 446.102 502.19 453.813 492.6 453.813C483.011 453.813 475.237 446.102 475.237 436.589C475.237 427.077 483.011 419.365 492.6 419.365C502.19 419.365 509.964 427.077 509.964 436.589ZM276.601 436.589C276.601 446.102 268.828 453.813 259.238 453.813C249.649 453.813 241.875 446.102 241.875 436.589C241.875 427.077 249.649 419.365 259.238 419.365C268.828 419.365 276.601 427.077 276.601 436.589ZM375.572 542C399.162 542 420.369 522.299 420.369 504.796C420.369 487.293 399.162 478.616 375.572 478.616C351.982 478.616 330.775 487.293 330.775 504.796C330.775 522.299 351.982 542 375.572 542Z"
                fill="var(--brand-fill)"
              />
            </svg>
          </span>
        )}
      </h2>
      {/* Details */}
      <span className="flex gap-x-4 items-center text-fluid--1 flex-wrap text-text-4">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
              clipRule="evenodd"
            />
          </svg>
          <time>{`${new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
          }).format(new Date(props.publishedAt))}`}</time>
        </span>

        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{`~${readingTime.readingTime} min`}</span>
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <span className="flex items-center gap-1">
            {props.tags && props.tags.map((tag, index) => {
              return (
                <React.Fragment key={tag._id}>
                  <a className="font-bold" href={`/cheeps/${tag.title.toLowerCase()}`}>{tag.title}</a>
                  {index !== props.tags.length - 1 ? ',' : ''}
                </React.Fragment>)
            })}
          </span>
        </span>
      </span>
    </header>
  )
}

export default LayoutHeader