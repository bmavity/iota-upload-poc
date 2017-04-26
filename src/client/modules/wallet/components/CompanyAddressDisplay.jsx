// @flow
import React from 'react'

import styles from './CompanyAddressDisplay.css'


const NoCompanyAddress = () =>
  <div>
    Please enter a Company seed so that a Company address can
    generated.
  </div>


const GeneratingCompanyAddress = () =>
  <div>
    A Company address is currently being generated.
  </div>


const CompanyAddress = ({ companyAddress }: { companyAddress: ?string }) =>
  <div>
    <img
      alt="IOTA logo" className={styles.iotaLogo} src="static/images/logo-black.png"
    /> Address:
    <div className={styles.companyAddress}>{companyAddress}</div>
  </div>


const CompanyAddressDisplay = ({ customerAddress, companySeed }: {
    customerAddress: ?string,
    companySeed: ?string,
  }) => {
  // eslint-disable-next-line no-nested-ternary
  const ActiveComponent = companySeed === null
    ? NoCompanyAddress
    : customerAddress === null
      ? GeneratingCompanyAddress
      : CompanyAddress

  return (
    <div className={`${styles.companyAddressDisplay} form-group`}>
      <label htmlFor="address">Company Address</label>
      <ActiveComponent companyAddress={customerAddress} />
    </div>
  )
}

export default CompanyAddressDisplay
