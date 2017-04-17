// @flow

import React, { Component } from 'react'
import Sidebar from 'react-sidebar'

import { WalletSidebar } from '../../../modules/wallet'


export default class App extends Component {
  state = {
    hasSidebarOpen: false,
  }

  setSidebarVisibility(isOpen: boolean) {
    this.setState(() => ({ hasSidebarOpen: isOpen }))
  }

  render() {
    return (
      <div>
        <Sidebar
          open={this.state.hasSidebarOpen}
          onSetOpen={isOpen => this.setSidebarVisibility(isOpen)}
          pullRight
          sidebar={(<WalletSidebar />)}
        >
          <h1>Metered Uploading</h1>
          <button id="select-files">Select Files</button>
          <button onClick={() => this.setSidebarVisibility(true)}>Wallet</button>
        </Sidebar>
      </div>
    )
  }
}
