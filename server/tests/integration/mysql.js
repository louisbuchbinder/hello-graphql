const assert = require('assert');
const {query} = require('../../mysql/utils');

describe('mysql integration tests', function () {

  it('should connect and execute a query', function () {
    const key = '2 + 3';

    return query(`SELECT ${key}`)
      .then(results => {
        assert.strictEqual(results[0][key], 5);
      });
  });

});
