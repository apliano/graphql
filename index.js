const { GraphQLServer } = require('graphql-yoga');

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: require('./src/resolvers.js')
});

const options = {
    port: (PORT = process.env.PORT || 8000)
};

server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`));
