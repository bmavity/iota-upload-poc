import { appActions } from '../../core/App/appState'

const bytesForOneIota = 1000000


// eslint-disable-next-line import/prefer-default-export
export class PayableUpload {
  constructor(fileId, upload) {
    this.fileId = fileId
    this.upload = upload

    this.bytesPaid = 0
    this.bytesPendingPayment = 0
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
    const totalPendingBytes = this.bytesPaid + this.bytesPendingPayment
    const unpaidBytes = bytesUploaded - totalPendingBytes

    if (unpaidBytes > 0) {
      this.pauseUpload()
      this.makePayment(unpaidBytes)
    }
  }

  makePayment(unpaidBytes) {
    const paymentAmount = Math.ceil(parseInt(unpaidBytes, 10) / bytesForOneIota)
    appActions.makePayment(this.fileId, paymentAmount)
  }

  pauseUpload() {
    this.upload.abort()
  }

  resumeUpload() {
    this.upload.start()
  }

  updateFileData(fileData) {
    const paymentTotals = fileData.payments.reduce((totals, payment) => {
      // eslint-disable-next-line no-param-reassign
      totals[payment.status] += payment.amount
      return totals
    }, {
      confirmed: 0,
      pending: 0,
      processing: 0,
    })
    this.bytesPaid = paymentTotals.confirmed
    this.bytesPendingPayment = paymentTotals.pending + paymentTotals.processing
  }
}
