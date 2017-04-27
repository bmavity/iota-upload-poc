import PaidUpload from '../PaidUpload'
import { makePayment } from '../../wallet'

jest.mock('../../wallet/wallet')


function argValue(mock, index) {
  return mock.mock.calls[0][index]
}

function createUpload(onProgress) {
  return {
    abort: jest.fn(),
    options: {
      onProgress: onProgress || jest.fn(),
    },
  }
}

function createPaidUpload(fileId, upload) {
  return new PaidUpload(fileId, upload || createUpload())
}

describe('PaidUpload, when imported', () => {
  it('should be defined', () => {
    expect(PaidUpload).toBeDefined()
  })
})

describe('PaidUpload, when created', () => {
  let paidUpload

  beforeAll(() => {
    paidUpload = createPaidUpload('a file id')
  })

  it('should have the proper fileId', () => {
    expect(paidUpload.fileId).toBe('a file id')
  })

  it('should not have any paid bytes', () => {
    expect(paidUpload.bytesPaid).toBe(0)
  })

  it('should not have any uploaded bytes', () => {
    expect(paidUpload.bytesUploaded).toBe(0)
  })
})

describe('PaidUpload, on upload progress', () => {
  let originalOnProgress

  beforeAll(() => {
    originalOnProgress = jest.fn()
    const upload = createUpload(originalOnProgress)
    createPaidUpload('file id 1', upload)

    upload.options.onProgress(12, 36)
  })

  it('should pass bytes uploaded and total bytes to original event handler', () => {
    expect(originalOnProgress).toBeCalledWith(12, 36)
  })
})

describe('PaidUpload, on upload progress, with unpaid bytes', () => {
  let paidUpload
  let upload

  beforeAll(() => {
    makePayment.mockClear()
    const unpaidBytes = 12000000
    const totalBytes = 36000000

    upload = createUpload()
    paidUpload = createPaidUpload('a file id 2', upload)

    upload.options.onProgress(unpaidBytes, totalBytes)
  })

  it('should stop upload', () => {
    expect(upload.abort).toBeCalledWith()
  })

  it('should have no paid bytes', () => {
    expect(paidUpload.bytesPaid).toBe(0)
  })

  it('should have the proper pending bytes', () => {
    expect(paidUpload.bytesPendingPayment).toBe(12000000)
  })

  it('should make payment with proper file id', () => {
    expect(argValue(makePayment, 0)).toBe('a file id 2')
  })

  it('should make payment with proper payment id', () => {
    expect(argValue(makePayment, 1)).toBe(1)
  })

  it('should make payment with proper payment amount', () => {
    expect(argValue(makePayment, 2)).toBe(12)
  })
})
