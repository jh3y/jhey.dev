import React from "react"

const ThemeToggle = () => {
  return (
    <form id="theme-toggle" action="/theme-toggle">
      <button>
        <span id="theme-toggle-label">Set theme to system</span>
      </button>
    </form>
  )
}

export default ThemeToggle