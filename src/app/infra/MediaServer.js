const ServerConf = require('./ServerConf')
const NodeMediaServer = require('node-media-server')

class MediaServer{
    constructor(servers){
        this._servers = servers
        this._serverConf = new ServerConf(this._servers)
        this._config = this._serverConf.getConf()
        this._nms = new NodeMediaServer(this._config)
    }

    startServer(){
        this._nms.run()
    }

    stopServer(){
        this._nms.stop()
    }
}

module.exports = MediaServer