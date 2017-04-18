// @flow
import React, { Component } from 'react'

import { initalize as initUploader } from '../uploader'

import './FileUploader.css'


export default class FileUploader extends Component {
  componentDidMount() {
    initUploader({
      inline: true,
      resumableUploads: true,
      target: '.uploader',
    })
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="uploader" />
    )
  }
}
