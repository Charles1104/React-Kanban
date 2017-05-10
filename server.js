/*jshint esversion:6*/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const db = require('./models');
const fs = require('fs');

app.use(express.static('./public') );
app.use( bodyParser.json() );

app.use('/api', require('./api'));

app.get('/*', (req, res) => {
  const rs = fs.createReadStream('./public/index.html');
  rs.on('open', () => {
    rs.pipe(res);
  });
  rs.on('error', (err) => {
    res.end(err);
  });
});

// clears db every time
// db.sequelize.sync({force:true});

app.listen(PORT, () =>{
  console.log(`Listening on ${PORT}`);
});