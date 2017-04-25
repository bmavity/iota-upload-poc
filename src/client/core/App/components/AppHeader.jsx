import React, { PropTypes } from 'react'


export default function AppHeader({ hasSidebarOpen, setSidebarVisibility }) {
  const sidebarActiveClass = hasSidebarOpen ? 'active' : ''

  return (
    <header className="header">
      <p className="header__title">
        <span>
          <img alt="IOTA logo" className="header__logo" src="static/images/logo.png" />
        </span> Pay-As-You-Go Uploads
      </p>
      <nav>
        <div className="nav-right hidden-xs">{
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          } <div className={`button ${sidebarActiveClass}`} onClick={() => setSidebarVisibility(!hasSidebarOpen)}>
            <div className="bar top" />
            <div className="bar middle" />
            <div className="bar bottom" />
          </div>
        </div>
      </nav>
    </header>
  )
}

AppHeader.propTypes = {
  hasSidebarOpen: PropTypes.bool.isRequired,
  setSidebarVisibility: PropTypes.func.isRequired,
}
