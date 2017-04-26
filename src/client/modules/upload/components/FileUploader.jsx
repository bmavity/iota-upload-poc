// @flow
import React, { Component } from 'react'

import { initalizeUploader } from '../uploader'

import './FileUploader.css'


export default class FileUploader extends Component {
  componentDidMount() {
    initalizeUploader({
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
