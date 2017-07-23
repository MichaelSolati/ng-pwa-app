const functions = require('firebase-functions');
const express = require('express');
const request = require('request');
const cors = require('cors');
const normalizeUrl = require('normalize-url');
const { JSDOM } = require('jsdom');

const app = express();
app.use(cors());

function manifestURL(base, manifest) {
  manifest = manifest.replace(/^\//, '');
  let baseArray = base.split('/');
  let manifestArray = manifest.split('/');
  let manifestURL = (base + '/' + manifest);
  if (baseArray[baseArray.length - 1] === manifestArray[0]) {
    baseArray.pop();
    manifestURL = (baseArray.join('/') + '/' + manifestArray.join('/'));
  }
  return manifestURL;
}

function appIcon(url, manifest) {
  return (url + '/' + manifest.icons[manifest.icons.length - 1].src.replace(/^\//, '').replace(/^.\//, ''));
}

function id(url) {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/\.|\#|\$|\[|\]|\//g, '---');
}

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
app.post('/manifest', (req, res) => {
  const url = normalizeUrl((req.body.url || ''), { stripWWW: false }).replace(/^http:\/\//i, 'https://');
  request({
    url,
  }, (error, response, body) => {
    if (error) {
      res.sendStatus(500);
    } else {
      try {
        const dom = new JSDOM(body);
        const meta = {
          title: (dom.window.document.querySelector('title')) ? dom.window.document.querySelector('title').textContent : null,
          description: (dom.window.document.querySelector('meta[name=description]')) ? dom.window.document.querySelector('meta[name=description]').content : null,
          author: (dom.window.document.querySelector('meta[name=author]')) ? dom.window.document.querySelector('meta[name=author]').content : null
        }
        const manifestHref = (dom.window.document.querySelector('link[rel=manifest]')) ? dom.window.document.querySelector('link[rel=manifest]').href : null;
        if (manifestHref) {
          request(manifestURL(url, manifestHref), (error, response, body) => {
            if (error) {
              res.sendStatus(500);
            } else {
              const manifest = JSON.parse(body);
              const result = JSON.stringify(Object.assign({
                meta,
                url,
                icon: appIcon(url, manifest),
                id: id(url)
              }, manifest));
              res.status(200).json(result);
            }
          });
        } else {
          res.sendStatus(500);
        }
      } catch (e) { res.sendStatus(500); }
    }
  });
});

exports.api = functions.https.onRequest(app);

