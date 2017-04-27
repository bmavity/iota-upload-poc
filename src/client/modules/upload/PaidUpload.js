import { makePayment } from '../wallet'

export const bytesForOneIota = 1000000


export default class PaidUpload {
  constructor(fileId, upload) {
    this.currentPaymentId = 0
    this.fileId = fileId
    this.upload = upload
    this.payments = {}

    // Initialize all byte fields to 0 except total
    // assumes upload has not been resumed
    this.bytesPaid = 0
    this.bytesPendingPayment = 0
    // eslint-disable-next-line no-underscore-dangle
    this.bytesTotal = upload._size
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
    // Determine how many bytes need to be paid
    const unpaidBytes = this.getUnpaidBytes(bytesUploaded)

    // If there are any bytes that have not been paid,
    // pause the upload and make a new payment
    if (unpaidBytes > 0) {
      this.pauseUpload()
      this.makePayment(unpaidBytes)
    }
  }

  complete(url) {
    // store the download url for the file
    this.url = url

    // Determine how many bytes left that need to be paid
    const unpaidBytes = this.getUnpaidBytes(this.bytesTotal)

    // If there are any bytes that have not been paid,
    // make a final payment
    if (unpaidBytes > 0) {
      this.makePayment(unpaidBytes)
    }
  }

  getNextPaymentId() {
    this.currentPaymentId = this.currentPaymentId + 1
    return this.currentPaymentId
  }

  getUnpaidBytes(bytesUploaded) {
    // To avoid double charging Customers for uploaded bytes
    // include the bytes that already have a transaction
    // created or are "pending" confirm
    const totalPendingBytes = this.bytesPaid + this.bytesPendingPayment
    return bytesUploaded - totalPendingBytes
  }

  makePayment(unpaidBytes) {
    // Calculate the amount of IOTA due, rounding up.
    const paymentAmount = Math.ceil(parseInt(unpaidBytes, 10) / bytesForOneIota)
    // Generate payment id
    const paymentId = this.getNextPaymentId()

    // Add the payment as processing
    this.payments[paymentId] = {
      bytesPaid: paymentAmount * bytesForOneIota,
      paymentId,
      paymentAmount,
      status: 'processing',
    }

    // Update the file data to reflect the payment
    this.updateFileData()

    // Call wallet API to complete the payment
    makePayment(this.fileId, paymentId, paymentAmount, (status) => {
      // Update payment status
      this.payments[paymentId].status = status
      // Update Paid Upload byte totals
      this.updateFileData()

      // If the payment attempt did not result in an error,
      // resume the upload
      if (status !== 'error') {
        this.resumeUpload()
      }
    })
  }

  pauseUpload() {
    this.upload.abort()
  }

  resumeUpload() {
    this.upload.start()
  }

  updateFileData() {
    const paymentTotals = Object.keys(this.payments)
      .map(id => this.payments[id])
      .reduce((totals, payment) => {
        // eslint-disable-next-line no-param-reassign
        totals[payment.status] += payment.bytesPaid
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
