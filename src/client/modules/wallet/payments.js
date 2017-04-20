import { appActions } from '../../core/App/appState'


function makePayment(unpaidBytes) {
  appActions.makePayment(unpaidBytes)
}

// eslint-disable-next-line import/prefer-default-export
export class PayableUpload {
  constructor(upload) {
    // this.fileId = fileId
    this.upload = upload

    this.bytesPaid = 0
    this.bytesUploaded = 0
    // this.totalBytes = upload.file.size

    const originalOnProgress = upload.options.onProgress
    // eslint-disable-next-line no-param-reassign
    upload.options.onProgress = (bytesUploaded, bytesTotal) => {
      originalOnProgress(bytesUploaded, bytesTotal)

      this.addBytesToUpload(bytesUploaded)
    }
  }

  addBytesToUpload(bytesUploaded) {
    const unpaidBytes = bytesUploaded - this.bytesPaid
    if (unpaidBytes > 0) {
      this.pauseUpload()
      makePayment(unpaidBytes)
    }
  }

  pauseUpload() {
    this.upload.abort()
  }
}

/*

  resumeUpload() {
    this.upload.start()
  }
}
*/
