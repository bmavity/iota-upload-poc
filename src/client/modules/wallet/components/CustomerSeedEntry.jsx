// @flow
import React, { Component } from 'react'

import { setCustomerSeed } from '../wallet'

import styles from './CustomerSeedEntry.css'


class SeedEntry extends Component {
  state = {
    customerSeed: '',
  }

  props: {
    customerSeed: ?string,
  }

  updateSeedValue(evt: Event & { currentTarget: HTMLInputElement }) {
    const customerSeed = evt.currentTarget.value
    this.setState(() => ({ customerSeed }))
  }

  render() {
    const { customerSeed } = this.props
    const seedValue = customerSeed === null ? this.state.customerSeed : ''

    return (
      <div>
        <input
          type="password"
          value={seedValue}
          className="form-control"
          placeholder="91 digit seed"
          onChange={evt => this.updateSeedValue(evt)}
        />
        <div className={styles.setSeed}>
          <button className="btn btn-success" onClick={() => setCustomerSeed(this.state.customerSeed)}>Set Seed</button>
        </div>
      </div>
    )
  }
}


const WalletLoading = () =>
  <div>Loading...</div>


const WalletBalance = ({ availableBalance }: { availableBalance: ?number }) =>
  <div>
    Available <img
      alt="IOTA logo"
      className={styles.iotaLogo}
      src="static/images/logo-black.png"
    /> Balance:
    <span className={`label label-primary ${styles.availableBalance}`}>{availableBalance}</span>
  </div>


const CustomerSeedEntry = ({ customerBalance, customerSeed }: {
    customerBalance: ?number,
    customerSeed: ?string,
  }) => {
  // eslint-disable-next-line no-nested-ternary
  const ActiveComponent = customerSeed === null
    ? SeedEntry
    : customerBalance === null
      ? WalletLoading
      : WalletBalance

  return (
    <div className={styles.customerSeedEntry}>
      <div className="form-group">
        <label htmlFor="address">Customer Wallet</label>
        <ActiveComponent
          availableBalance={customerBalance}
          customerSeed={customerSeed}
        />
      </div>
    </div>
  )
}

export default CustomerSeedEntry
