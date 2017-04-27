// @flow
import React, { Component } from 'react'
import Sidebar from 'react-sidebar'

import AppHeader from './AppHeader'
import { FileInformation } from '../../../modules/upload'
import { PaymentInformation, WalletSidebar } from '../../../modules/wallet'
import { connect, getAppState } from '../appState'

import styles from './App.css'


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
          sidebar={(<WalletSidebar {... this.state.appState} />)}
        >
          <main>
            <AppHeader hasSidebarOpen={this.state.hasSidebarOpen} {... actions} />

            <section className={styles.send__section}>
              <div className={styles.send}>
                <div className={styles.send__header}>
                  <p className={styles.send__headerTitle}>File Uploader</p>
                </div>
                <div className={styles.send__body}>
                  <div className="row">
                    <div className={`col-xs-12 ${styles.appContent}`}>
                      <div className={styles.paymentInformation}>
                        <PaymentInformation {... this.state.appState} />
                      </div>
                      <div className={styles.fileUploader}>
                        <FileInformation {... this.state.appState} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </Sidebar>
      </div>
    )
  }
}
