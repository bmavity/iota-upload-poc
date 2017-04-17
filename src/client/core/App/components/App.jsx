// @flow
import React, { Component } from 'react'
import Sidebar from 'react-sidebar'

import AppHeader from './AppHeader'
import { FileUploader } from '../../../modules/upload'
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
    const actions = {
      setSidebarVisibility: isOpen => this.setSidebarVisibility(isOpen),
    }
    return (
      <div>
        <Sidebar
          open={this.state.hasSidebarOpen}
          onSetOpen={isOpen => this.setSidebarVisibility(isOpen)}
          pullRight
          sidebar={(<WalletSidebar {... this.state.appState} {... appActions} />)}
        >
          <main>
            <AppHeader hasSidebarOpen={this.state.hasSidebarOpen} {... actions} />

            <FileUploader />
          </main>
        </Sidebar>
      </div>
    )
  }
}
