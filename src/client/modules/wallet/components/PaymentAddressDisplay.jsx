// @flow
import React from 'react'

import styles from './PaymentAddressDisplay.css'


const NoPaymentAddress = () =>
  <div>
    Please enter a Company Seed so that a payment address can
    generated.
  </div>


const GeneratingPaymentAddress = () =>
  <div>
    A payment address is currently being generated.
  </div>


const PaymentAddress = ({ paymentAddress }: { paymentAddress: ?string }) =>
  <div>
    <img
      alt="IOTA logo" className={styles.iotaLogo} src="static/images/logo-black.png"
    /> Address:
    <div className={styles.paymentAddress}>{paymentAddress}</div>
  </div>


const PaymentAddressDisplay = ({ paymentAddress, companySeed }: {
    paymentAddress: ?string,
    companySeed: ?string,
  }) => {
  // eslint-disable-next-line no-nested-ternary
  const ActiveComponent = companySeed === null
    ? NoPaymentAddress
    : paymentAddress === null
      ? GeneratingPaymentAddress
      : PaymentAddress

  return (
    <div className="form-group">
      <label htmlFor="address">Payment Address</label>
      <ActiveComponent paymentAddress={paymentAddress} />
    </div>
  )
}

export default PaymentAddressDisplay
