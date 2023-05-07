const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

let users = [
    {name: 'John'},
    {name: 'Jane'},
    {name: 'Jack'}
]

app.get('/', (req, res) => {
    res.render(__dirname + '/views/pages/index', {users})
})

app.post('/users', bodyParser.urlencoded(), (req, res) => {
    const name = req.body.name
    users.push({name: name})
    res.redirect('/')
})

app.post('/users/:name', (req, res) => {
    const name = req.params.name
    users = users.filter(users => users.name != name)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})