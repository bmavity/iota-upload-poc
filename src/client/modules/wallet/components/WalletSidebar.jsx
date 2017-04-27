// @flow
import React, { Component } from 'react'

import AddressGenerationMessage from './AddressGenerationMessage'
import CompanySeedEntry from './CompanySeedEntry'
import CompanyAddressAndBalance from './CompanyAddressAndBalance'
import { setCompanySeed } from '../wallet'

import styles from './WalletSidebar.css'


export default class WalletSidebar extends Component {
  static defaultProps = {
    companyConfirmedBalance: null,
    companyPendingBalance: null,
    companySeed: null,
    companyAddress: null,
  }

  state = {
    companySeed: '',
  }

  props: {
    companyAddress?: string,
    companyConfirmedBalance?: number,
    companyPendingBalance?: number,
    companySeed?: string,
  }

  updateSeedValue(evt: Event & { currentTarget: HTMLInputElement }) {
    const companySeed = evt.currentTarget.value
    this.setState(() => ({ companySeed }))
  }

  render() {
    // eslint-disable-next-line max-len
    const { companyConfirmedBalance, companyPendingBalance, companySeed, companyAddress } = this.props

    const isGeneratingAddress = companyAddress === null && companySeed !== null

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
            hasCompanyAddress={companyAddress !== null}
            companyConfirmedBalance={companyConfirmedBalance}
            companyPendingBalance={companyPendingBalance}
          />
        </ul>
      </div>
    )
  }
}
