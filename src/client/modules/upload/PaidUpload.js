import { appActions } from '../../core/App/appState'

const bytesForOneIota = 1000000


export default class PaidUpload {
  constructor(fileId, upload) {
    this.fileId = fileId
    this.upload = upload

    // Initialize all byte fields to 0
    // assumes upload has not been resumed
    this.bytesPaid = 0
    this.bytesPendingPayment = 0
    this.bytesUploaded = 0

    // Save original onProgress handler
    const originalOnProgress = upload.options.onProgress
    // eslint-disable-next-line no-param-reassign
    upload.options.onProgress = (bytesUploaded, bytesTotal) => {
      // Invoke original onProgress handler to avoid
      // possible breakage of Uppy functionality
      originalOnProgress(bytesUploaded, bytesTotal)

      // Process the uploaded bytes
      this.addBytesToUpload(bytesUploaded)
    }
  }

  addBytesToUpload(bytesUploaded) {
    // To avoid double charging Customers for uploaded bytes
    // include the bytes that already have a transaction
    // created or are "pending" confirm
    const totalPendingBytes = this.bytesPaid + this.bytesPendingPayment
    const unpaidBytes = bytesUploaded - totalPendingBytes

    // If there are any bytes that have not been paid,
    // pause the upload and make a new payment
    if (unpaidBytes > 0) {
      this.pauseUpload()
      this.makePayment(unpaidBytes)
    }
  }

  makePayment(unpaidBytes) {
    // Calculate the amount of IOTA due, rounding up.
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
