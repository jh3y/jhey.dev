import React from 'react'

const rssComponents = {
  tweet({ node, account = 'jh3yy', id, ...props }) {
    return (
      <blockquote>
        <p>
          <a href={`https://twitter.com/${account}/status/${id}`}>
            Check out the related tweet!
          </a>
        </p>
      </blockquote>
    )
  },
  codepen({ node, ...props }) {
    return (
      <blockquote>
        <p>
          Check out the <a href={`https://codepen.io/jh3y/${props.id}`}>demo pen</a> by Jhey (<a href="https://codepen.io/jh3y">@jh3y</a>) over on{' '}
          <a href={`https://codepen.io/jh3y/${props.id}`}>CodePen</a>.
        </p>
      </blockquote>
    )
  },
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    const toc = node.children.find(child => child.tagName === 'tableofcontents')
    if (toc) return null
    if (interactive) return <>{props.children}</>
    return <p>{props.children}</p>
  },
  img({ node, ...props }) {
    if (props.src.endsWith('.mp4')) {
      props.src = `https://jhey.dev${props.src}`
      return <video {...props} controls loop muted></video>
    }
    if (props.src.endsWith('.mp3')) {
      props.src = `https://jhey.dev${props.src}`
      return <audio {...props} controls></audio>
    }
    return <img {...props} />
  },
  a({ node, children, ...props }) {
    if (props.href.startsWith('/')) {
      props.href = `https://jhey.dev${props.href}`
    }
    return <a {...props}>{children}</a>
  },
}

export default rssComponents