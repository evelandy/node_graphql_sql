const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas');

const app = express();
const PORT = 4242;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
