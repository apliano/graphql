module.exports = {
    Query: {
        info: () => `This is the API of a GraphQL tutorial`,
        feed: (root, args, context) => context.prisma.links(),
        link: (parent, args, context) => context.prisma.link({ id: context.id })
    }