const requireDir = require('require-dir');
const resolvers = requireDir('./resolvers');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const app = module.exports = express();

app.use(require('./authentication'));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));
