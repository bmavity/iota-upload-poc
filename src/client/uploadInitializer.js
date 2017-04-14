// @flow

import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import Tus10 from 'uppy/lib/plugins/Tus10'
import Informer from 'uppy/lib/plugins/Informer'
import MetaData from 'uppy/lib/plugins/MetaData'

import { WEB_PORT } from '../shared/config'


const uppy = Uppy({ autoProceed: false })

export default function initalize() {
  uppy
    .use(Dashboard, {
      resumableUploads: true,
      trigger: '#select-files',
    })
    .use(Informer, { target: Dashboard })
    .use(Tus10, { endpoint: `//localhost:${WEB_PORT}/files` })
    .use(MetaData, {
      fields: [
        { id: 'resizeTo', name: 'Resize to', value: 1200, placeholder: 'specify future image size' },
        { id: 'description', name: 'Description', value: 'none', placeholder: 'describe what the file is for' },
      ],
    })
  .run()

  uppy.on('core:upload-started', (fileId, upload) => {
    upload.abort()
    uppy.getPlugin('Tus').pauseUpload(fileId)
    uppy.getPlugin('Tus').pauseResume('pauseAll')
    uppy.getPlugin('DashboardUI').pauseAll()
    upload.onChunkCompleted((chunkSize, bytesAccepted, bytesTotal) => {
      // eslint-disable-next-line no-console
      console.log(`Chunk size: ${chunkSize}, bytes accepted: ${bytesAccepted}, bytes total: ${bytesTotal}`)
    })
  })
  uppy.on('core:upload-progress', (data) => {
    // eslint-disable-next-line no-console
    console.log(data.id, data.bytesUploaded, data.bytesTotal)
    uppy.getPlugin('DashboardUI').pauseAll()
    uppy.getPlugin('Tus').pauseResume('pauseAll')
  })

  uppy.on('core:pause-all', () => {
    // eslint-disable-next-line no-console
    console.log('all paused')
  })

  uppy.on('core:resume-all', () => {
    // eslint-disable-next-line no-console
    console.log('all resumed')
  })
}
