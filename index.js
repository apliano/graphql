const { prisma } = require('./src/generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('require-dir-all')('./src/resolvers');

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
        prisma
    })
});

const options = {
    port: process.env.PORT || 8000
};

server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
