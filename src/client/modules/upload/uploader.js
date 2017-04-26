import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import Tus10 from 'uppy/lib/plugins/Tus10'
import Informer from 'uppy/lib/plugins/Informer'
import Webcam from 'uppy/lib/plugins/Webcam'

import { WEB_PORT } from '../../../shared/config'
import PaidUpload from './PaidUpload'

const uploaders = {}

// Initialize Uppy with autoProceed: false so that uploads
// do not start automaticlly.
const uppy = Uppy({ autoProceed: false, debug: true })

// Create a PaidUpload instance for each file that is uploaded
uppy.on('core:upload-started', (fileId, upload) => {
  // Encapsulate the Uppy fileId and upload into an object
  // that will keep track of progress and payments
  uploaders[fileId] = new PaidUpload(fileId, upload)
})


export default uppy

// Called once to initialize the Uppy UI
export function initalizeUploader(config) {
  // UI plugin for friendly display
  uppy.use(Dashboard, config)
    // Allows webcam video to be uploaded
    .use(Webcam, { target: Dashboard })
    // Displays information messages
    .use(Informer, { target: Dashboard })
    // File uploading protocol that allows uploads to be paused/resumed
    .use(Tus10, { endpoint: `//localhost:${WEB_PORT}/files` })

  // Display the configured Uppy UI
  uppy.run()
}

export function pauseUploads() {
  uppy.getPlugin('DashboardUI').pauseAll()
}

export function resumeUploads() {
  uppy.getPlugin('DashboardUI').resumeAll()
}

export function updateFileData(files) {
  files.forEach(f => uploaders[f.fileId].updateFileData(f))
}
