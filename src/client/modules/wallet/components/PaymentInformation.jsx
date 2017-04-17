// @flow
import React, { Component, PropTypes } from 'react'

import styles from './PaymentInformation.css'


const SeedEntry = ({ seedValue, setPaymentSeed, updateSeedValue }) =>
  <div>
    <div className="form-group">
      <label htmlFor="address">My wallet seed</label>
      <input
        type="password"
        value={seedValue}
        className="form-control"
        placeholder="91 digit seed"
        onChange={updateSeedValue}
      />
    </div>
    <div className={styles.setSeed}>
      <button className="btn btn-success" onClick={setPaymentSeed}>Set Seed</button>
    </div>
  </div>
SeedEntry.propTypes = {
  seedValue: PropTypes.string.isRequired,
  setPaymentSeed: PropTypes.func.isRequired,
  updateSeedValue: PropTypes.func.isRequired,
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


export default class PaymentInformation extends Component {
  static propTypes = {
    paymentBalance: PropTypes.number,
    paymentSeed: PropTypes.string,
    setPaymentSeed: PropTypes.func.isRequired,
  }

  state = {
    paymentSeed: '',
  }

  updateSeedValue(evt: any) {
    const paymentSeed = evt.target.value
    this.setState(() => ({ paymentSeed }))
  }

  render() {
    const { paymentBalance, paymentSeed, setPaymentSeed } = this.props
    const seedValue = paymentSeed ? '' : this.state.paymentSeed
    // eslint-disable-next-line no-nested-ternary
    const ActiveComponent = paymentSeed === null
      ? SeedEntry
      : paymentBalance === null
        ? WalletLoading
        : WalletBalance

    return (
      <div className={styles.paymentInformation}>
        <h3>Payment Information</h3>

        <ActiveComponent
          paymentBalance={paymentBalance}
          seedValue={seedValue}
          setPaymentSeed={() => setPaymentSeed(this.state.paymentSeed)}
          updateSeedValue={evt => this.updateSeedValue(evt)}
        />
      </div>
    )
  }
}
