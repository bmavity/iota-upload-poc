// @flow
import React from 'react'

import PaymentAddressDisplay from './PaymentAddressDisplay'
import UserSeedEntry from './UserSeedEntry'

import styles from './PaymentInformation.css'

type Props = {
  companySeed: ?string,
  paymentAddress: ?string,
  paymentBalance: ?number,
  paymentSeed: ?string,
  setPaymentSeed: (seed: string) => void,
}

const PaymentInformation = (props: Props) =>
  <div className={styles.paymentInformation}>
    <h3>Payment Information</h3>

    <UserSeedEntry {... props} />
    <PaymentAddressDisplay {... props} />
  </div>

export default PaymentInformation
