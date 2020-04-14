class Rtmp {
    constructor(){
        this._port = 1935
        this._chunk_size = 60000
        this._gop_cache = true
        this._ping = 30
        this._ping_timeout = 60
    }

    getRtmp(){
        return {
            port: this._port,
            chunk_size: this._chunk_size,
            gop_cache : this._gop_cache,
            ping : this._ping,
            ping_timeout : this._ping_timeout
        }
    }
}

module.exports = Rtmp