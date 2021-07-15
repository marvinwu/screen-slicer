require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Mutation = require('./resolvers/Mutation.js')
const Query = require('./resolvers/Query.js')

const db = new Prisma({
  typeDefs: `${__dirname}/generated/schema.graphql`,
  endpoint: process.env.PRISMA_ENDPOINT,
})

function createServer() {
  return new GraphQLServer({
    typeDefs: `${__dirname}/schema.graphql`,
    resolvers: {
      Mutation,
      Query,
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  })
}

const server = createServer()

// to do, use express middleware to handle JWT

// to do , use express midelle to inject user info

function corsControl(origin, callback) {
  if (origin && origin.includes(process.env.FRONTEND_URL_PATTERN)) {
    console.log(`${origin} is allowed`)
    callback(null, true)
  } else {
    console.error(`${origin} is not allowed`)
    callback(new Error('Not allowed by CORS'))
  }
}

server.start(
  {
    cors: {
      credentials: true,
      origin: corsControl,
    },
  },
  deets => {
    console.log(`allowed front end ${process.env.FRONTEND_URL_PATTERN}`)
    console.log(`server is running now on port:${deets.port}`)
  }
)
