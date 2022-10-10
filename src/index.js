const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 4000;

// gql schema using gql schema language
const typeDefs = gql`
    type Query {
        hello: String
    }, 
    type Query {
        bye: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello from GraphQL'
    },
    Query: {
        bye: () => 'That is it for today!'
    }
};


async function startApolloServer(typeDefs, resolvers){
    // apollo server setup
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/api'});
    
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);



// await apolloServer.start();
// // applying apollo graphql middleware and set the path to /api
// apolloServer.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => {
//     res.send("Hello fold");
// });

// app.listen({port}, () => {
//     console.log(`GraphQL server running at http://localhost:${port}${apolloServer.graphqlPath}`);
//     }
// );
