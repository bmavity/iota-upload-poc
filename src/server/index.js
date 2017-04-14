// @flow

import compression from 'compression'
import express from 'express'
import tus from 'tus-node-server'

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import renderApp from './render-app'


const app = express()

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME))
})

const server = new tus.Server()
server.datastore = new tus.FileStore({
  path: '/files',
})

app.all('/files', (req, res) => {
  server.handle(req, res)
})

app.all('/files/*', (req, res) => {
  server.handle(req, res)
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
