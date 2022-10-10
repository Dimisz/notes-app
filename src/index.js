const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 4000;

let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott'},
    { id: '2', content: 'This is another note', author: 'Harlow Everly'},
    { id: '3', content: 'Oh look, another note', author: 'Riley Harrison'}
];
// gql schema using gql schema language
const typeDefs = gql`
type Note {
    id: ID!
    content: String!
    author: String!
}  

type Query {
        hello: String!
        notes: [Note!]!
        note(id: ID!): Note!
}

type Mutation {
    newNote(content: String!): Note!
}
`;

const resolvers = {
    Query: {
        hello: () => 'Hello from GraphQL',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Adam Scott'
            };
            notes.push(noteValue);
            return noteValue;
        }
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
