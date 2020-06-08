const assert = require('assert');
const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const app = require('../../app');
const clientQuery = String(fs.readFileSync(path.join(
  __dirname,
  '..',
  '..',
  'graphql',
  'clientQuery.graphql'
)));

module.exports = function (operationName, variables = {}, auth = '') {
  return supertest(app)
    .post('/graphql')
    .set('Authorization', auth)
    .send({
      query: clientQuery,
      variables,
      operationName
    })
    .then(results => {
      if (results.body.errors) {
        assert(false, results.body.errors[0].message);
      }
      assert.strictEqual(results.status, 200);
      assert(results.body.data);

      return results.body.data;
    });
};

