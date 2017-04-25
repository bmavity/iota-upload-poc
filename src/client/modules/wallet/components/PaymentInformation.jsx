// @flow
import React from 'react'

import CompanyAddressDisplay from './CompanyAddressDisplay'
import CustomerSeedEntry from './CustomerSeedEntry'

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

    <CustomerSeedEntry {... props} />
    <CompanyAddressDisplay {... props} />
  </div>

export default PaymentInformation
