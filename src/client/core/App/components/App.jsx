// @flow
import React, { Component } from 'react'
import Sidebar from 'react-sidebar'

import AppHeader from './AppHeader'
import { FileInformation } from '../../../modules/upload'
import { PaymentInformation, WalletSidebar } from '../../../modules/wallet'
import { appActions, connect, getAppState } from '../appState'

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
          sidebar={(<WalletSidebar {... this.state.appState} {... appActions} />)}
        >
          <main>
            <AppHeader hasSidebarOpen={this.state.hasSidebarOpen} {... actions} />

            <section className={styles.send__section}>
              <div className={styles.send}>
                <div className={styles.send__header}>
                  <p className={styles.send__headerTitle}>Upload File</p>
                </div>
                <div className={styles.send__body}>
                  <div className="row">
                    <div className={`col-xs-12 ${styles.appContent}`}>
                      <div className={styles.paymentInformation}>
                        <PaymentInformation {... this.state.appState} {... appActions} />
                      </div>
                      <div className={styles.fileUploader}>
                        <FileInformation {... this.state.appState} {... appActions} />
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


/*

<div className="col-xs-6">
  <div className="form-group">
    <label htmlFor="name">Your Name</label>
    <input type="text" maxLength="16" className="form-control" id="name" placeholder="Enter Name" />
  </div>
</div>

<div className="col-xs-6">
  <div className="form-group">
    <label htmlFor="value">Value</label>
    <input type="number" className="form-control" id="value" placeholder="Value to Send" />
  </div>
</div>

<div className="col-xs-12">
  <div className="form-group">
    <label htmlFor="address">Recipient Address</label>
<input type="text" className="form-control" id="address" placeholder="IOTA address of recipient" />
  </div>
</div>

<div className="col-xs-12">
  <div className="form-group">
    <label htmlFor="message">Text Area</label>
    <textarea id="message" className="form-control" rows="3" placeholder="Message to send" />
  </div>
</div>

<div className={styles.send__button}>
  <button className="btn btn-success btn-lg" id="submit">Submit</button>
</div>
*/
