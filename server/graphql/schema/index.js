const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Address {
  text: String!
}

type Coordinate {
  lat: Float!,
  long: Float!
}

type Geometry {
  type: String!
  coordinates: [Coordinate]
}

type Outlet {
  name: String!
  description: String
  geometry: [Geometry]
}

type RootQuery {
  getOutletIdentifier(address: String!): String
  outlets: [Outlet!]!
}

type RootMutation {
  getOutlet(address: String!): Outlet
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
