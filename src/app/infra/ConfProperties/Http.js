class Http{

    constructor(){
        this._port = 8000
        this._allow_origin = '*'
    }

    getHttp(){
        return {
            port : this._port,
            allow_origin: this._allow_origin
        }
    }

}

module.exports = Http