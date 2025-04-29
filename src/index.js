require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const { testConnections } = require('./db/connection');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Tester les connexions aux bases de données
testConnections();

// Créer le serveur Apollo
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    // Vous pouvez ajouter des informations de contexte ici
    // comme l'authentification de l'utilisateur
    return {
      user: req.user // À implémenter si nécessaire
    };
  },
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path
    };
  },
  // Désactiver Apollo Studio Explorer (optionnel)
  introspection: true,
  playground: false // désactive le playground intégré si vous utilisez Apollo Server v2
});

// Initialiser l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Fonction pour démarrer le serveur
async function startServer() {
  // Démarrer le serveur Apollo
  await server.start();
  
  // Appliquer le middleware Apollo à Express
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Configurer GraphQL Playground sur un chemin dédié
  app.get('/playground', expressPlayground({ 
    endpoint: '/graphql',
    settings: {
      'editor.theme': 'dark',
      'editor.reuseHeaders': true,
      'tracing.hideTracingResponse': true,
      'queryPlan.hideQueryPlanResponse': true,
    }
  }));
  
  // Démarrer le serveur Express
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🔍 Interface GraphQL Playground disponible sur http://localhost:${PORT}/playground`);
  });
}

// Démarrer le serveur
startServer().catch((err) => {
  console.error('Erreur au démarrage du serveur:', err);
});