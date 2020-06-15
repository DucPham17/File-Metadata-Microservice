'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require("multer")
var app = express();
var bodyParser = require("body-parser")


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

var upload = multer({ dest: './public' });

app.post("/api/fileanalyse", upload.single('upfile'),function (req, res, next) { 
  const file = req.file
  if(!file){
    res.json("not a file")
  }
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
}) 



app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
