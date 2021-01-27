const express = require('express')
const path = require('path')
const logger = require('morgan')
// const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')

const users = require('./routes/user')

const app = express()
var MongoClient = require('mongodb').MongoClient;
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
let json = require('./cities.json')
let SchemaCities = require('./model/cites')

// Create a write stream
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'hackerbay.log'), {flags: 'a'})

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('combined', { stream: accessLogStream }))

function cities() {
  var data = json
  console.log(data);
}
cities()





mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
  }

  let response = await  SchemaCities.insertMany(json);
  console.log(response)
  

})
.catch(err => {
	console.error("App starting error:", err.message);
	process.exit(1);
});
var db = mongoose.connection;

db.on('open', function(){
  console.log("connected")
})

app.get('/', function (req, res) {
    res.send('Hello World!')
  })
  
app.use('/api/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  res.status(404).send({ error: 'Page does not exist' })
  next(err)
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })