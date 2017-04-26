// @flow
import React, { Component } from 'react'

import AddressGenerationMessage from './AddressGenerationMessage'
import CompanySeedEntry from './CompanySeedEntry'
import CompanyAddressAndBalance from './CompanyAddressAndBalance'
import { setCompanySeed } from '../wallet'

import styles from './WalletSidebar.css'


export default class WalletSidebar extends Component {
  static defaultProps = {
    companyBalance: null,
    companySeed: null,
    customerAddress: null,
  }

  state = {
    companySeed: '',
  }

  props: {
    companyBalance?: number,
    companySeed?: string,
    customerAddress?: string,
  }

  updateSeedValue(evt: Event & { currentTarget: HTMLInputElement }) {
    const companySeed = evt.currentTarget.value
    this.setState(() => ({ companySeed }))
  }

  render() {
    const { companyBalance, companySeed, customerAddress } = this.props

    const isGeneratingAddress = customerAddress === null && companySeed !== null

    const actions = {
      setCompanySeed: () => setCompanySeed(this.state.companySeed),
      updateSeedValue: evt => this.updateSeedValue(evt),
    }

    return (
      <div className={styles.sidebar}>
        <h2>Company Wallet</h2>
        <ul className={styles.sidebarList}>
          <CompanySeedEntry
            companySeed={this.state.companySeed}
            hasSeedSet={companySeed !== null}
            {... actions}
          />
          <AddressGenerationMessage
            isGeneratingAddress={isGeneratingAddress}
          />
          <CompanyAddressAndBalance
            hasCustomerAddress={customerAddress !== null}
            companyBalance={companyBalance}
          />
        </ul>
      </div>
    )
  }
}
