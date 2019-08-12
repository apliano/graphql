const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../userUtils');

async function signup(parent, args, context) {
    let user = await context.prisma.user({ email: args.email });
    if (user) {
        throw new Error('No such user found');
    }
    const password = await bcrypt.hash(args.password, 10);
    user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user
    };
}

async function login(parent, args, context) {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('No such user found');
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
        token,
        user
    };
}

function post(parent, args, context) {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
    });
}

module.exports = {
    post,
    login,
    signup,
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
};
