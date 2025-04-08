import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs.js'
import { resolvers } from './schema/resolvers.js'
import playgroundMiddleware from 'graphql-playground-middleware-express'

const playground = playgroundMiddleware.default || playgroundMiddleware

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

await server.start()
server.applyMiddleware({ app })

app.get('/playground', playground({ endpoint: '/graphql' }))

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:4000${server.graphqlPath}`)
  console.log(`🎮 Playground dispo sur http://localhost:4000/playground`)
})
