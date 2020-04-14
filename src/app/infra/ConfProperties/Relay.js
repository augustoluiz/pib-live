const Tasks = require('../helpers/Tasks')

class Relay{
    constructor(servers){
        this._ffmpeg = './ffmpeg/bin/ffmpeg.exe'
        this._tasks = Tasks.tasks(servers)
    }

    getRelay(){
        return {
            ffmpeg : this._ffmpeg,
            tasks : this._tasks 
        }
    }
}

module.exports = Relay