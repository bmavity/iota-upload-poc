// @flow
import React, { Component } from 'react'

import styles from './FileUploader.css'


const CannotUpload = () =>
  <div>
    <h4>Cannot Upload</h4>
    <p>
      You must have an IOTA balance and a payment address to process uploads.
    </p>
  </div>

const CanUpload = () =>
  <div>
    <button id="select-files">Select Files</button>
  </div>


export default class FileUploader extends Component {
  state = {
  }

  props: {
    paymentAddress: ?string,
    paymentBalance: ?number,
    paymentSeed: ?string,
  }

  render() {
    const { paymentAddress, paymentBalance, paymentSeed } = this.props
    const hasPaymentAddress = paymentAddress !== null
    const canPay = paymentSeed !== null
      && paymentBalance !== null
      && parseInt(paymentBalance, 10) > 0
    const canUpload = hasPaymentAddress && canPay
    const DisplayComponent = canUpload ? CanUpload : CannotUpload

    return (
      <div className={styles.fileUploader}>
        <h3>File Information</h3>
        <DisplayComponent />
      </div>
    )
  }
}
