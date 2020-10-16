const mysql = require('mysql');
const { host, user, password } = require('../configs').mysqlDb
module.exports = () => {
    const connection = mysql.createConnection({
    host,
    user,
    password
    });
 
    connection.connect(err => {
        if(err)     {
            console.log("Error connecting to mysql", err)
        }
        else{
            console.log("We are connected to mysql")
            // connection.query("CREATE DATABASE my_db", (err, result) => {
            //     if (err) {
            //         console.log("Error Creating Database", err)}
            //     else {
            //         console.log("Database created");
            //     }
            //   });
        }
    })

    // connection.end(() => {
    //     console.log("Oops we are disconnected from mysql")
    // })
}