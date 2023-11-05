import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import listRepos from './resolvers/listRepos';
import typeDefs from './typeDefs';
import { envs } from './app-config';
import getRepoDetails from './resolvers/getRepoDetails';

const resolvers = {
  Query: {
    listRepos,
    getRepoDetails,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: envs.PORT },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
