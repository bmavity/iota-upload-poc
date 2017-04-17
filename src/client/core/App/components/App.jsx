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
    this.setState(state => Object.assign({}, state, { hasSidebarOpen: isOpen }))
  }

  render() {
    return (
      <div>
        <Sidebar
          open={this.state.hasSidebarOpen}
          onSetOpen={isOpen => this.setSidebarVisibility(isOpen)}
          pullRight
          sidebar={(<WalletSidebar {... this.state.appState} {... appActions} />)}
        >
          <h1>Metered Uploading</h1>
          <button id="select-files">Select Files</button>
          <button onClick={() => this.setSidebarVisibility(true)}>Wallet</button>
        </Sidebar>
      </div>
    )
  }
}
