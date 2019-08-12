module.exports = {
    info: () => `This is the API of a GraphQL tutorial`,
    feed: (root, args, context) => context.prisma.links(),
    link: (root, args, context) => context.prisma.link({ id: args.id })
};
