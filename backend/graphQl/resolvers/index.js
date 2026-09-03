const { bitResolver } = require("./bitResolvers");

const resolvers = {
  Query: {
    ...bitResolver.query,
  },
  Mutation: {
    ...bitResolver.mutations,
  },
};

module.exports = { resolvers };
