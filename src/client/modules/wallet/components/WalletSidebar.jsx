// @flow
import React, { Component } from 'react'

import AddressGenerationMessage from './AddressGenerationMessage'
import CompanySeedEntry from './CompanySeedEntry'

import styles from './WalletSidebar.css'


export default class WalletSidebar extends Component {
  state = {
    companySeed: '',
  }

  props: {
    companyBalance: number,
    companySeed: string,
    paymentAddress: string,
    setCompanySeed: Function,
  }

  updateSeedValue(evt: Event & { currentTarget: HTMLInputElement }) {
    const companySeed = evt.currentTarget.value
    this.setState(() => ({ companySeed }))
  }

  render() {
    const { companyBalance, paymentAddress, companySeed, setCompanySeed } = this.props

    const isGeneratingAddress = paymentAddress === null && companySeed !== null

    const balanceActiveClass = companySeed ? 'active' : ''
    const balanceCollapseClass = companySeed ? 'in' : ''

    const actions = {
      setCompanySeed: () => setCompanySeed(this.state.companySeed),
      updateSeedValue: evt => this.updateSeedValue(evt),
    }

    return (
      <div className={styles.sidebar}>
        <h2>Company Wallet</h2>
        <ul className={styles.sidebarList}>
          <CompanySeedEntry
            hasSeedSet={companySeed !== null} companySeed={this.state.companySeed} {... actions}
          />

          <AddressGenerationMessage isGeneratingAddress={isGeneratingAddress} />

          <li className={`${styles.sidebarItem} ${balanceActiveClass} ${styles.companyBalance}`}>
            <div className={`collapse ${balanceCollapseClass}`}>
              <div className="well">
                <div className="form-group">
                  <h3>Balance: <span>{companyBalance}</span></h3>
                </div>
              </div>
            </div>
          </li>

        </ul>
      </div>
    )
  }
}
