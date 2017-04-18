// @flow
import React, { Component, PropTypes } from 'react'

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


export default class WalletSidebar extends Component {
  static propTypes = {
    companySeed: PropTypes.string,
    paymentAddress: PropTypes.string,
  }

  state = {
  }

  render() {
    const canUpload = this.props.paymentAddress && this.props.companySeed
    const DisplayComponent = canUpload ? CanUpload : CannotUpload
    return (
      <div className={styles.fileUploader}>
        <h3>File Information</h3>
        <DisplayComponent />
      </div>
    )
  }
}
