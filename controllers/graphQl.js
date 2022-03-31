const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('../graphql/schemas/index');
const graphqlResolver = require('../graphql/resolvers/index');

// starting graphQl HTTP server controller
module.exports = graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  customFormatErrorFn(err) {
    if (!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || "An error occured.";
    const code = err.originalError.code || 500;
    return {
      message: message,
      status: code,
      data: data
    }
  }
});