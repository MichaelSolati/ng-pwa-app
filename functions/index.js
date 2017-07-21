const functions = require('firebase-functions');
const express = require('express');
const request = require('request');
const cors = require('cors');
const metascraper = require('metascraper');

const app = express();
app.use(cors());

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.post('/manifest', (req, res) => {
  const url = (req.body.url || '').replace(/\/$/, '');
  const manifestURL = url + '/manifest.json';

  const options = {
    method: 'GET',
    url: manifestURL
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendStatus(500);
    } else {
      metascraper
        .scrapeUrl(url)
        .then((metadata) => {
          let details = { meta: metadata, url };
          let result = JSON.stringify(Object.assign(details, JSON.parse(body)));
          res.status(200).json(result);
        }, (error) => {
          let details = { url };
          let result = JSON.stringify(Object.assign(details, JSON.parse(body)));
          res.status(200).json(result);
        });
    }
  });
});

exports.api = functions.https.onRequest(app);

