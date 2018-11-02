const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
app.set('view engine', 'ejs');

var route = require('./controllers/route');
route(app)



app.listen(process.env.port, () => console.log(`Example app listening on port ${port}!`))