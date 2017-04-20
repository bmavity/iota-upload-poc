import { uploader } from '../upload'
import { PayableUpload } from './payments'

export PaymentInformation from './components/PaymentInformation'
export WalletSidebar from './components/WalletSidebar'

export { generateAddress, getAccountBalance, makePayment } from './wallet'


const uploaders = []

uploader.on('core:upload-started', (fileId, upload) => {
  uploaders.push(new PayableUpload(fileId, upload))
})
