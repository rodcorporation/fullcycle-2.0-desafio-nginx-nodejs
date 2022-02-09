const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
/*
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Rodrigo')`
connection.query(sql)
connection.end()*/

app.get('/', async (req,res) => {
    var html = "<h1>Full Cycle</h1><br><br>"    

    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    
    const sql = `SELECT id, name FROM people;`
    const result = connection.query(sql, (err, rows) => {
        if (err) throw err;

        Object.keys(rows).forEach(function(key) {
            var row = rows[key];
            html = html + `Id: ${row.id} - Nome: ${row.name}<br>`
        });

        res.send(html)
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})