import { createServer } from 'http'
import * as path from 'path'

import { normalizePort, onError, onListening } from './utils/utils';
import App from './app';
import * as db from './db'

const env: string = process.env.NODE_ENV || 'development'
let config = require(path.resolve(`${__dirname}/config/config.json`))[env]


db.configure(config).sync()
  .then(() => {
    const port = normalizePort(process.env.port || 3000)
    const app = new App()
    const server = createServer(app.express)

    server.listen(port)
    server.on('error', onError(server))
    server.on('listening', onListening(server))
  })

