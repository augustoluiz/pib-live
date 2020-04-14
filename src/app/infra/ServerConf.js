const Rtmp = require('./ConfProperties/Rtmp')
const Http = require('./ConfProperties/Http')
const Relay = require('./ConfProperties/Relay')

class ServerConf{
    constructor(servers){
        this._rtmp = new Rtmp().getRtmp()
        this._http = new Http().getHttp()
        this._relay = new Relay(servers).getRelay()
    }

    getConf(){
        return {
            rtmp : this._rtmp,
            http : this._http,
            relay : this._relay
        }
    }
}

module.exports = ServerConf