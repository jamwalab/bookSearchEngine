const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const { authMiddleware } = require('./utils/auth');
let server = "";

// create a new Apollo server and pass in our schema data
async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
}
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on ${PORT}`));
});