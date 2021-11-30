const { AuthenticationError } = require('apollo-server-express')
const { User, Activity, Food } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('friends')
                .populate('activities')
                .populate('foods')

                return userData
            }

            throw new AuthenticationError('Not logged in')
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('activities')
            .populate('foods')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('activities')
            .populate('foods')
        },
        activities: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Activity.find(params).sort({ createdAt: -1 })
        },
        activity: async (parent, { _id }) => {
            return Activity.findOne({ _id })
        },
        foods: async (parent, { username }) => {
            const params = username ? { username } : {}
            return Food.find(params).sort({ createdAt: -1 })
        },
        food: async (parent, { _id }) => {
            return Food.findOne({ _id })
        }
    }
}