var express = require('express');
var router = express.Router();

const crypto = require('crypto');

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/MyMongoDB", function(err, database) {
  if(err) throw err;

  db = database;

  console.log("Listening on port 3000");
});

// Reuse database object in request handlers

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection("lab1").find({}, function(err, docs) {
    if(err) throw err;
    docs.each(function(err, doc) {
      if(doc) {
        const cipher = crypto.createCipher('aes256', 'asaadsaad');
        const decipher = crypto.createDecipher('aes256', 'asaadsaad');

        var encrypted = doc.message;

        var decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log("decrypted: " + decrypted);
      }
      else {
        res.end();
      }
    });
  });
  
  res.render('index', { title: 'MongoDB' });
});


module.exports = router;
