const graphql = require('graphql');
const userData = require('../MOCK_DATA.json');
const UserType = require('./TypeDefs');
const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
 } = require('graphql');

//  Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new graphql.GraphQLList(UserType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return userData
      }
    },
    getOneUser: {
      type: new graphql.GraphQLNonNull(UserType),
      args: { id: { type: GraphQLInt } },
      async resolve(parent, args) {
        // const user = userData.find((usr) => usr.id == args.id);
        // return user;
        let usrInfo;
        const user = userData.find((usr) => {
          if (args.id == usr.id) {
            usrInfo = usr;
          }
        })
        return usrInfo;
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        admin: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        // this is where a sql query would go
        userData.push({
          id: userData.length + 1,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
          admin: args.admin
        });
        return args;
      }
    }
  }
})

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation})