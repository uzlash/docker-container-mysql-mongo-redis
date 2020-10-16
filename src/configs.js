module.exports = {
    webToken: {
        secretKey: '3%&gkddh^&**434tgdghdg8809746423hgd6CCSBdjfifu5372BBSyghsf646974047^^&*$##2',
        expiresIn: 3600, //1 hour
    },

    mongoDb: {
        host: 'mdb',
        port: '27017',
        username: 'uzlash',
        password: 'secret',
        database: 'uzlashDB'
    },
    redisDb: {
        host: 'rdb',
        port: 6379,
        db: 0
    },
    mysqlDb: {
        host: 'mydb',
        user: 'root',
        password: 'secret'
    }
}