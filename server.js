//
// This server program is a proxy to get an OAuth2 token from FIWARE Keyrock.
// You can set up an endpoint to get a token without letting a user know 
// a client_id and a client_secret. A user who use an application can get
// an OAuth2 token with his usename and his password.
// 
// Copyright (C) Kazuhito Suda
//
'use strict';

const config = require('./config');
const request = require('request');
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const keyrock_url = config.keyrock_url;
const client_id = config.client_id;
const client_secret = config.client_secret;
const port = config.port;
const path = config.path;

app.use(bodyParser.json());

app.post(path, (req, res) => {
    try {
      const body = req.body;
  
      console.log(`[${new Date()}] request = [${JSON.stringify(body)}]`);
  
      res.header('Content-Type', 'application/json; charset=utf-8')

      if (body.username == null) {
         res.status(404).json({"Error" : {"Message": "missing username"}});
      } else if (body.password == null) {
         res.status(404).json({"Error" : {"Message": "missing passowrd"}});
      } else {
         get_token(body.username, body.password).then(function (value) {
           console.log('status : ' + value[0].statusCode);
           console.log('body : ' + value[1]);
           res.status(value[0].statusCode).send(value[1]);
         }).catch(function (error) {
           res.sendStatus(500); // Internal Server Error
         });
      }
   } catch (error) {
     console.log("exception");
     console.log(error.message);
     res.sendStatus(500); // Internnal Server Error
   }
});

console.log("Start get token proxy server : " + port);
app.listen(port);

//
// async get_token()
//
function get_token(username, password) {
  return new Promise(function (resolve, reject) {  
    var post_data = 'grant_type=password&username=' + username + '&password=' + password;
  
    var auth_header = 'Basic ' + (new Buffer(client_id + ':' + client_secret)).toString('base64');
  
    var headers = {
      'Authorization': auth_header,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
    }
  
    var options = {
        url: keyrock_url,
        method: 'POST',
        headers: headers,
        form: post_data
    };
    
    request(options, function (error, response, body) {
      if (error) {
        console.log('error001 in get_token :' + error.message);
        reject(new Error(error.message));
      }
//      console.log('statusCode:', response && response.statusCode);
//      console.log('body:', body);
      resolve([response, body]);
    });
  });
}
