import PaidUpload from '../PaidUpload'
import { appActions } from '../../../core/App/appState'

jest.mock('../../../core/App/appState')


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
  let upload

  beforeAll(() => {
    appActions.makePayment.mockClear()
    const unpaidBytes = 12000000
    const totalBytes = 36000000

    upload = createUpload()
    createPaidUpload('a file id 2', upload)

    upload.options.onProgress(unpaidBytes, totalBytes)
  })

  it('should stop upload', () => {
    expect(upload.abort).toBeCalledWith()
  })

  it('should make payment for unpaid bytes', () => {
    expect(appActions.makePayment).toBeCalledWith('a file id 2', 12)
  })
})
