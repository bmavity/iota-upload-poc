// @flow
import React, { Component } from 'react'

import styles from './CustomerSeedEntry.css'


class SeedEntry extends Component {
  state = {
    paymentSeed: '',
  }

  props: {
    paymentSeed: ?string,
    setPaymentSeed: (seed: string) => void,
  }

  updateSeedValue(evt: Event & { currentTarget: HTMLInputElement }) {
    const paymentSeed = evt.currentTarget.value
    this.setState(() => ({ paymentSeed }))
  }

  render() {
    const { paymentSeed, setPaymentSeed } = this.props
    const seedValue = paymentSeed === null ? this.state.paymentSeed : ''

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
          <button className="btn btn-success" onClick={() => setPaymentSeed(this.state.paymentSeed)}>Set Seed</button>
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


const CustomerSeedEntry = ({ paymentBalance, paymentSeed, setPaymentSeed }: {
    paymentBalance: ?number,
    paymentSeed: ?string,
    setPaymentSeed: (seed: string) => void
  }) => {
  // eslint-disable-next-line no-nested-ternary
  const ActiveComponent = paymentSeed === null
    ? SeedEntry
    : paymentBalance === null
      ? WalletLoading
      : WalletBalance

  return (
    <div className={styles.customerSeedEntry}>
      <div className="form-group">
        <label htmlFor="address">Customer Wallet</label>
        <ActiveComponent
          availableBalance={paymentBalance}
          paymentSeed={paymentSeed}
          setPaymentSeed={setPaymentSeed}
        />
      </div>
    </div>
  )
}

export default CustomerSeedEntry
