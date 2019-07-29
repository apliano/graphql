const { prisma } = require('./src/generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: require('./src/resolvers.js'),
    context: { prisma }
});

const options = {
    port: process.env.PORT || 8000
};

server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
