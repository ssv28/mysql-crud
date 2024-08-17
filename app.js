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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let { email, password, inputData } = req.query             //INSERT DATA
    console.log(req.query)

    if (email && password) {

        if (inputData) {

            // Update Data

            let UPDATE_query = `UPDATE users SET email = '${email}', password = '${password}' WHERE id = '${inputData}' `;
            console.log(UPDATE_query);
            
            connection.query(UPDATE_query, function (error, results) {
                if (error) throw error;
            });

        } else {

            // Insert Data

            let INSERT_query = `INSERT INTO users( email, password) VALUES ('${email}','${password}')`;
            connection.query(INSERT_query, function (error, results) {
                if (error) throw error;
            });
        }

        return res.redirect("/");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    let { delid } = req.query;                      //DELETE DATA
    console.log(delid)

    if (delid) {
        let DELETE_query = `DELETE FROM users WHERE id = ${delid}`;
        connection.query(DELETE_query, function (error, results) {
            if (error) throw error;

        });

        return res.redirect("/");

    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    let SELETE_query = 'SELECT * FROM `users`'                  //SELECT DATA

    connection.query(SELETE_query, function (error, results) {
        if (error) throw error;


        //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''';;//

        let editid = req.query.editid                             //UPDATE DATA
        console.log(results.find(el => el.id == editid));

        let input = {}
        if (editid >= 0) {
            input = results.find(el => el.id == editid)
        }

        return res.render("index", { data: results, input, editid })

    });

    // console.log(SELETE_query)

})

app.listen(3000)



// let INSERT_query = INSERT into users( email, password ) VALUES ('${email}','${password}')

// connection.query(INSERT_query, function (error, results) {
//     if (error) throw error;

// });
// return res.redirect("/")
// }