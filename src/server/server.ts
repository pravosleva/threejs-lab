import http from 'http'
import path from 'path'
import express from 'express'
import socketIO from 'socket.io'
// import fs from 'fs'

const isDev = process.env.NODE_ENV === 'development'
const PORT: string = process.env.PORT
const port: any = PORT ? Number(PORT) : 3000

class App {
  private server: http.Server
  private port: number

  constructor(port: number) {
    this.port = port
    const app = express()

    if (isDev) {
      app.get('/', function(_req, res) {
        res.redirect(301, '/index.dev.html')
      });
    }
    app.use(express.static(path.join(__dirname, '../client')))

    app.use('/build/three.module.js', express.static(path.join(__dirname, '../../node_modules/three/build/three.module.js')))
    app.use('/jsm/controls/OrbitControls', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/controls/OrbitControls.js')))
    app.use('/jsm/libs/stats.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/stats.module.js')))
    app.use('/jsm/libs/dat.gui.module', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/dat.gui.module.js')))
    // app.use('/jsm/libs/WebGL', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/WebGL')))
    // app.use('/jsm/libs/inflate.module.min.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/inflate.module.min.js')))
    // app.use('/jsm/loaders/FBXLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/FBXLoader.js')))
    // app.use('/jsm/curves/NURBSCurve.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/curves/NURBSCurve.js')))
    // app.use('/jsm/curves/NURBSUtils.js', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/curves/NURBSUtils.js')))
    // app.use('/jsm/libs/tween.module.min', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/libs/tween.module.min.js')))
    // app.use('/jsm/loaders/GLTFLoader', express.static(path.join(__dirname, '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js')))
    this.server = new http.Server(app)

    if (isDev) new socketIO.Server(this.server)
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on http://localhost:${this.port}`)
    })
  }
}

new App(port).Start()
