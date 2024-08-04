let express = require('express')
let app = express()

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_auth'
});

connection.connect();


app.set("view engine", "ejs")

app.get("/", (req, res) => {

    let { email, password } = req.query
    console.log(req.query)

    if (email && password) {
        let INSERT_query = `INSERT into user( email, password ) VALUES ('${email}','${password}')`

        connection.query(INSERT_query, function (error, results) {
            if (error) throw error;

        });
        return res.redirect("/")
    }

    // let SELETE_query = 'SELECT * FROM `user`'

    // connection.query(SELETE_query, function (error, results) {
    //     if (error) throw error;

    //     return res.render("index", { data: results })

    // });
    // console.log(SELETE_query)


    // let { delid } = req.query;
    // console.log(delid)

    // if (delid) {
    //     let DELETE_query = `DELETE FROM user WHERE id = ${connection.escape(delid)}`;
    //     connection.query(DELETE_query, function (error, results) {
    //         if (error) throw error;

    //         return res.redirect("/");
    //     });
    

    // }

})
app.listen(3000)