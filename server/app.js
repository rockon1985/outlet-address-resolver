const graphqlHttp = require('express-graphql');
const express = require('express');
const bodyParser = require('body-parser');
const Schema = require('./graphql/schema');
const Resolvers = require('./graphql/resolvers');
const config = require('./config.js')

const app = express();
app.use(bodyParser.json());
function allowCors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}  

app.options(allowCors)
app.use(allowCors);
app.use(
  '/graphql',
  graphqlHttp({
    schema: Schema,
    rootValue: Resolvers,
    graphiql: true,
    cors: true
  })
);

app.listen(config.get('port'))