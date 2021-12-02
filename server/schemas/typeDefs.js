const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        email: String
        friends: [User]
        friendCount: Int
        activities: [Activity]
        foods: [Food]
    }

    type Activity {
        _id: ID
        type: String
        caloricValue: Int
        createdAt: String
        details: String
        user: User
    }

    type Food {
        _id: ID
        type: String
        caloricValue: Int
        createdAt: String
        details: String
        user: User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        activities(username: String): [Activity]
        activity(_id: ID!): Activity
        foods(username: String): [Food]
        food(_id: ID!): Food
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addActivity(type: String!, caloricValue: Int!, details: String): Activity
        addFood(type: String!, caloricValue: Int!, details: String): Food
        addFriend(friendId: ID!): User
    }
`

module.exports = typeDefs