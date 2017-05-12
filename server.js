/*jshint esversion:6*/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const db = require('./models');
const fs = require('fs');

// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');

app.use( bodyParser.json() );

//session
// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

//password hashing
// const saltRounds = 10;
// const bcrypt = require('bcrypt');

app.use(express.static('./public') );

app.use('/api', require('./api'));
// app.use('/login', require('./login'));
// app.use('/register', require('./register'));

app.get('/*', (req, res) => {
  const rs = fs.createReadStream('./public/index.html');
  rs.on('open', () => {
    rs.pipe(res);
  });
  rs.on('error', (err) => {
    res.end(err);
  });
});


// db.sequelize.sync({force:true});

app.listen(PORT, () =>{
  console.log(`Listening on ${PORT}`);
});