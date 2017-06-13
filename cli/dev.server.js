const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const opn = require('opn')
const webpackConfig = require('./webpack.dev.conf.js')
const app = new express()

const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {},
    path: '/__webpack_hmr'
}))

app.get("/", function(req, res) {
  res.sendFile(path.resolve(__dirname, '../') + '/index.html');
})

// app.use(express.static('./index.html'))

app.listen(3008, (err) => {
    if (err) {
        console.log(err)
        return
    }
    const uri = 'http://localhost:3008'
    opn(uri)
})