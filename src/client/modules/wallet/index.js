import { uploader } from '../upload'
import { PayableUpload } from './payments'

export PaymentInformation from './components/PaymentInformation'
export WalletSidebar from './components/WalletSidebar'

export { generateAddress, getAccountBalance } from './wallet'


const uploaders = []

uploader.on('core:upload-started', (fileId, upload) => {
  uploaders.push(new PayableUpload(fileId, upload))
})

uploader.on('core:upload-progress', (data) => {
  // eslint-disable-next-line no-console
  console.log('upload progress', data)
})
