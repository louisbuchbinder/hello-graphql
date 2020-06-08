const fs = require('fs');
const path = require('path');
const {buildSchema} = require('graphql');

const schema = buildSchema(String(fs.readFileSync(
  path.join(__dirname, 'schema.graphql')
)));

module.exports = schema;
