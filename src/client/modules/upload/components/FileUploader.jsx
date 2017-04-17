// @flow
import React, { Component } from 'react'

import styles from './FileUploader.css'


export default class WalletSidebar extends Component {
  static propTypes = {
  }

  state = {
  }

  render() {
    return (
      <div className={styles.fileUploader}>
        <button id="select-files">Select Files</button>
      </div>
    )
  }
}
