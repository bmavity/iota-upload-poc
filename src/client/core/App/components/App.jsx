// @flow

import React, { Component } from 'react'
import Sidebar from 'react-sidebar'

import { WalletSidebar } from '../../../modules/wallet'
import { appActions, connect, getAppState } from '../appState'


export default class App extends Component {
  constructor() {
    super()

    this.state = Object.assign({}, {
      hasSidebarOpen: false,
    }, { appState: getAppState() })
    connect(appState => this.setState(state => Object.assign({}, state, { appState })))
  }

  state: {
    appState: any,
    hasSidebarOpen: boolean,
  }

  setSidebarVisibility(isOpen: boolean) {
    console.log(isOpen)
    this.setState(state => Object.assign({}, state, { hasSidebarOpen: isOpen }))
  }

  render() {
    const sidebarActiveClass = this.state.hasSidebarOpen ? 'active' : ''
    return (
      <div>
        <Sidebar
          open={this.state.hasSidebarOpen}
          onSetOpen={isOpen => this.setSidebarVisibility(isOpen)}
          pullRight
          sidebar={(<WalletSidebar {... this.state.appState} {... appActions} />)}
        >
          <main>
            <header className="header">
              <p className="header__title">
                <span>
                  <img alt="IOTA logo" className="header__logo" src="static/images/logo.png" />
                </span>
                File Uploader
              </p>
              <nav>
                <div className="nav-right hidden-xs">{
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  } <div className={`button ${sidebarActiveClass}`} onClick={() => this.setSidebarVisibility(!this.state.hasSidebarOpen)}>
                    <div className="bar top" />
                    <div className="bar middle" />
                    <div className="bar bottom" />
                  </div>
                </div>
              </nav>
            </header>

            <h1>Metered Uploading</h1>
            <button id="select-files">Select Files</button>
            <button onClick={() => this.setSidebarVisibility(true)}>Wallet</button>
          </main>
        </Sidebar>
      </div>
    )
  }
}
