
const express = require('express')
var cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath  = '/api/auth';

        // conectar a db
        this.dbConnect();

        // middleware
        // Funciones que agregan funciones al webserver
        this.midlewares();

        // rutas de mi applicacion
        this.routes();
    }

    async dbConnect(){
        await dbConection()
    }

    midlewares(){
        // CORS
        this.app.use(cors());

        // leer y parsear body
        this.app.use( express.json())

        // directorio publico
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;