// @flow
import React, { Component } from 'react'

import FileUploader from './FileUploader'

import styles from './FileInformation.css'

const CannotUpload = () =>
  <div>
    <h4>Cannot Upload</h4>
    <p>
      You must have an IOTA balance and a payment address to process uploads.
    </p>
  </div>


export default class FileInformation extends Component {
  state = {
  }

  props: {
    companyAddress: ?string,
    customerBalance: ?number,
    customerSeed: ?string,
  }

  render() {
    const { companyAddress, customerBalance, customerSeed } = this.props
    const hasCompanyAddress = companyAddress !== null
    const canPay = customerSeed !== null
      && customerBalance !== null
      && parseInt(customerBalance, 10) > 0
    const canUpload = hasCompanyAddress && canPay
    const DisplayComponent = canUpload ? FileUploader : CannotUpload

    return (
      <div className={styles.fileUploader}>
        <h3>File Information</h3>
        <DisplayComponent />
      </div>
    )
  }
}
