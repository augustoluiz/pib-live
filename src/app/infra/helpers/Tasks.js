class Tasks{
    static tasks(servers){
        let arrayTasks = []
        servers.forEach(server => {
            arrayTasks.push({
                app : 'live',
                mode : 'push',
                edge : `${server.link}/${server.key}`
            })
        });
        return arrayTasks
    }
}

module.exports = Tasks
