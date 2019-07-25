let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
];
let idCount = links.length;

function findLinkById(linkId) {
    return links.findIndex(({ id }) => id == linkId);
}

module.exports = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(({ id }) => id == args.id)
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            let indexToUpdate = findLinkById(args.id);
            let updatedItem = null;
            if (indexToUpdate) {
                updatedItem = { ...links[indexToUpdate], ...args };
                links[indexToUpdate] = updatedItem;
            }
            return updatedItem;
        },
        deleteLink: (parent, args) => {
            const indexToDelete = findLinkById(args.id);
            if (indexToDelete) {
                links.splice(indexToDelete, 1);
            }
        }
    }
};
