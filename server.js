const express = require('express') ; 

const bodyParser = require('body-parser') ; 

const bcrypt = require('bcrypt-nodejs') ; 

const cors = require('cors') ; 

const knex = require('knex') ; 

const register = require('./controllers/register') ;
const signin = require('./controllers/signin') ; 
const profile = require('./controllers/profile') ; 
const image = require('./controllers/image') ;  

const db =  knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Waheguru',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json()) ; 
app.use(cors()) ; 

app.get('/', (req, resp) => { resp.send(db.users)}) ; 

app.post('/signIn', signin.handleSignIn(db, bcrypt)) ; 

app.post('/register', (req, resp) => {register.handleRegister(req, resp, db,bcrypt)}) ; 

app.get('/profile/:id', (req, resp) => { profile.handleProfileGet(req, resp, db)}) ; 

app.put('/image',(req, resp) => {image.handleImage(req, resp, db)}) ; 

app.post('/imageurl',(req, resp) => {image.handleApiCall(req, resp)}) ; 

app.listen(3000, () =>
{
	console.log("app is running on port 3000"); 
})
