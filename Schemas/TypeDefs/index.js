const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean 
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    admin: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
