import { gql } from "apollo-boost"

export const getOutlet = gql`
  query getOutput($address: String!){
    outlet: getOutletIdentifier(address: $address)
  }
`