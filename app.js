let express = require('express')
let app = express()

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_admin'
});

connection.connect();


app.set("view engine", "ejs")

app.get("/", (req, res) => {


    //INSERT DATA

    let { email, password } = req.query
    console.log(req.query)

    if (email && password) {
        let INSERT_query = `INSERT into users( email, password ) VALUES ('${email}','${password}')`

        connection.query(INSERT_query, function (error, results) {
            if (error) throw error;

        });
        return res.redirect("/")
    }



    //DELETE DATA

    let { delid } = req.query;
    console.log(delid)

    if (delid) {
        let DELETE_query = `DELETE FROM users WHERE id = ${connection.escape(delid)}`;
        connection.query(DELETE_query, function (error, results) {
            if (error) throw error;

        });

        return res.redirect("/");

    }





    // if (editid && email && password) {
    //     console.log(editid && email && password)
    //     // let UPDATE_query = `UPDATE users SET email = ?, password = ? WHERE id = ?`;
    //     // let UPDATE_query = `UPDATE users SET email = 'xyz@gmail.com', paasword = 'df234' WHERE ID = 4`;

    //     let UPDATE_query = `UPDATE users(email, password, editid) SET VALUES ('${editid}', '${email}','${password}') `;
    //     console.log(UPDATE_query);

    //     connection.query(UPDATE_query, function (error, results) {
    //         if (error) throw error;

    //     });

    // return res.redirect("/");
    // }




    //SELECT DATA


    let SELETE_query = 'SELECT * FROM `users`'

    connection.query(SELETE_query, function (error, results) {
        if (error) throw error;
        let editid = req.query.editid
            console.log(results.find(el => el.id == editid));
            
        let input = {}
        if(editid >= 0){
            input = results.find(el => el.id == editid)
        }
        return res.render("index", { data: results, input, editid })

    });
    
    // console.log(SELETE_query)

})

app.listen(3000)






