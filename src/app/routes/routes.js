const MediaServer = require('../infra/MediaServer')
let mediaServer = null

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.marko(require('../views/home.marko'))
    })

    app.post('/live-status', (req, res) => {
        let dados = req.body
        let servers = [{link: dados.ytlink, key: dados.ytkey}, {link: dados.fblink, key: dados.fbkey}]
        mediaServer = new MediaServer(servers)
        mediaServer.startServer()
        res.marko(require('../views/live-status.marko'))
    })

    app.post('/live-end', (req, res) => {
        mediaServer.stopServer()
        res.redirect('/')
    })
}