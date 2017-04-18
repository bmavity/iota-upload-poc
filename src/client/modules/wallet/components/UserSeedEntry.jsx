// @flow
import React, { Component, PropTypes } from 'react'

import styles from './PaymentInformation.css'


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
        <div className="form-group">
          <label htmlFor="address">My wallet seed</label>
          <input
            type="password"
            value={seedValue}
            className="form-control"
            placeholder="91 digit seed"
            onChange={evt => this.updateSeedValue(evt)}
          />
        </div>
        <div className={styles.setSeed}>
          <button className="btn btn-success" onClick={() => setPaymentSeed(this.state.paymentSeed)}>Set Seed</button>
        </div>
      </div>
    )
  }
}


const WalletLoading = () =>
  <div>Loading...</div>


const WalletBalance = ({ paymentBalance }) =>
  <div>
    <img
      alt="IOTA logo" className={styles.send__logo} src="static/images/logo-black.png"
    /> Balance: <span
      className="label label-primary"
    >{paymentBalance}</span>
  </div>
WalletBalance.propTypes = {
  paymentBalance: PropTypes.number.isRequired,
}


const UserSeedEntry = ({ paymentBalance, paymentSeed, setPaymentSeed }: {
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
    <ActiveComponent
      paymentBalance={paymentBalance}
      paymentSeed={paymentSeed}
      setPaymentSeed={setPaymentSeed}
    />
  )
}

export default UserSeedEntry
