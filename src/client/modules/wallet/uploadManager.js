// @flow
import { uploader } from '../upload'
import { PayableUpload } from './payments'

const uploaders = {}


uploader.on('core:upload-started', (fileId, upload) => {
  uploaders[fileId] = new PayableUpload(fileId, upload)
})


// eslint-disable-next-line import/prefer-default-export
export function updateFileData(files: any) {
  files.forEach(f => uploaders[f.fileId].updateFileData(f))
}
