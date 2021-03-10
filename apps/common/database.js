const config = require('config');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : config.get('mysql.host'),
    user     : config.get('mysql.user'),
    password : config.get('mysql.password'),
    database : config.get('mysql.database'),
    port     : config.get('mysql.port'),
});

connection.connect();

const getConnection = () => {
    if(!connection){
        connection.connect();
    }
    return connection;
}

module.exports = {
    getConnection
}