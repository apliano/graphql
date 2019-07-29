function findLinkById(linkId) {
    return links.findIndex(({ id }) => id == linkId);
}

module.exports = {
    Query: {
        info: () => `This is the API of a GraphQL tutorial`,
        feed: (root, args, context) => context.prisma.links()
        // link: (parent, args) => await prisma.links.find(({ id }) => id == args.id)
    },
    Mutation: {
        post: (parent, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            });
        },
        updateLink: (parent, args, context) => {
            return context.prisma.updateLink({
                data: { description: args.description, url: args.url },
                where: { id: args.id }
            });
        },
        deleteLink: (parent, args, context) => {
            return context.prisma.deleteLink({
                id: args.id
            });
        }
    }
};
