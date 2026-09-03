/*********** import starts ***********/

"use strict";
const koa = require("koa");
var bodyParser = require("koa-bodyparser");
const { ApolloServer } = require("apollo-server-koa");
const { resolvers } = require("./graphQl/resolvers/index");
const { typeDefs } = require("./graphQl/typeDefs");
const { router } = require("./routes/routes");
const { connectDB } = require("./db/index");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const cors = require("@koa/cors");

const serve = require("koa-static");
const { environment } = require("./environment");

const app = new koa();

app.use(bodyParser());

app.use(cors());

app.use(serve("./uploads"));

app.use(router.routes()).use(router.allowedMethods());

// app.listen(PORT, () =>
// console.log("App is listening on url http://localhost:" + PORT)
// );
app.listen({ port: environment.PORT }, async () => {
  console.log(
    `🚀 Server ready at http://localhost:${environment.PORT}/graphql`
  );
});

const startServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  await connectDB();

  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => {
      return {
        ctx,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app });
};
startServer();
