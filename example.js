'use strict';

/* eslint-disable unicorn/no-abusive-eslint-disable */

/* eslint-disable */

const app = require('koa')();
const router = require('koa-router')();

router.post('/upload', body(), function* (next) {
  console.log(this.request.files);
  console.log(this.request.fields);

  // there's no `.body` when `multipart`,
  // `urlencoded` or `json` request
  console.log(this.request.body);

  // print it to the API requester
  this.body = JSON.stringify(
    {
      fields: this.request.fields,
      files: this.request.files,
      body: this.request.body || null,
    },
    null,
    2,
  );

  yield next;
});

app.use(router.routes());
app.listen(4292);

const { format } = require('util');
const body = require('./src/index');

const host = 'http://localhost:4292';
const cmd = 'curl -i %s/upload -F "source=@%s/.editorconfig"';

console.log('Try it out with below CURL for `koa-better-body` repository.');
console.log(format(cmd, host, __dirname));
