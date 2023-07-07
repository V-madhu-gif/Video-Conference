//Creating a server for my web app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//Connecting Database
const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "",
    database : "pmt"
})
app.use(bodyParser.urlencoded({extended:true}))
con.connect((err)=>{
    if(err)throw err
    console.log("Connected !")
})
// Creating a rout for homepage
app.get('/',(req,res)=>{
    res.sendFile('pages/index.html',{root:__dirname})
})
// Creating POST rout for login in check
app.post('/login',(req,res)=>{
    let userEmail = req.body.email;
    let userPassword = req.body.password
    let query = ("SELECT pass FROM videocall WHERE ?")
    var values = [
        [ pass = `${userPassword}`]
      ]
    con.query(query,[values],(err,result)=>{
        if(err){
            res.send(alert("Can't login this time"))
        }
        else{
            res.redirect('/main')
        }
    })
})
//Creating rout for Main app
app.get('/main',(req,res)=>{
    res.sendFile('pages/main.html',{root:__dirname})
})
// port - 3000
app.listen(3000);
