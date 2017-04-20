// @flow
import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import Tus10 from 'uppy/lib/plugins/Tus10'
import Informer from 'uppy/lib/plugins/Informer'
import Webcam from 'uppy/lib/plugins/Webcam'

import { WEB_PORT } from '../../../shared/config'


const uppy = Uppy({ autoProceed: false, debug: true })


export default uppy

export function initalize(config: any) {
  uppy.use(Dashboard, config)
    .use(Webcam, { target: Dashboard })
    .use(Informer, { target: Dashboard })
    .use(Tus10, { endpoint: `//localhost:${WEB_PORT}/files` })

  uppy.run()
}

export function pauseUploads() {
  uppy.getPlugin('DashboardUI').pauseAll()
}

export function resumeUploads() {
  uppy.getPlugin('DashboardUI').resumeAll()
}
