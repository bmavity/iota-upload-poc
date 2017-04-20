import { PayableUpload } from '../payments'
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

function createPayable(fileId, upload) {
  return new PayableUpload(fileId, upload || createUpload())
}

describe('PayableUpload, when imported', () => {
  it('should be defined', () => {
    expect(PayableUpload).toBeDefined()
  })
})

describe('PayableUpload, when created', () => {
  let payable

  beforeAll(() => {
    payable = createPayable('a file id')
  })

  it('should have the proper fileId', () => {
    expect(payable.fileId).toBe('a file id')
  })

  it('should not have any paid bytes', () => {
    expect(payable.bytesPaid).toBe(0)
  })

  it('should not have any uploaded bytes', () => {
    expect(payable.bytesUploaded).toBe(0)
  })
})

describe('PayableUpload, on upload progress', () => {
  let originalOnProgress

  beforeAll(() => {
    originalOnProgress = jest.fn()
    const upload = createUpload(originalOnProgress)
    createPayable('file id 1', upload)

    upload.options.onProgress(12, 36)
  })

  it('should pass bytes uploaded and total bytes to original event handler', () => {
    expect(originalOnProgress).toBeCalledWith(12, 36)
  })
})

describe('PayableUpload, on upload progress, with unpaid bytes', () => {
  let upload

  beforeAll(() => {
    appActions.makePayment.mockClear()

    upload = createUpload()
    createPayable('a file id 2', upload)

    upload.options.onProgress(12, 36)
  })

  it('should stop upload', () => {
    expect(upload.abort).toBeCalledWith()
  })

  it('should make payment for unpaid bytes', () => {
    expect(appActions.makePayment).toBeCalledWith('a file id 2', 12)
  })
})
