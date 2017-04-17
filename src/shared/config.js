// @flow

import config from '../../iota.wallet.config'

export const WEB_PORT = process.env.PORT || 3000
export const STATIC_PATH = '/static'
export const APP_NAME = 'Metered Uploads'

export const WDS_PORT = 7000

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`

export const iotaConfig = config
