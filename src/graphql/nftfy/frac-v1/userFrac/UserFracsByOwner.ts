import { gql } from '@apollo/client'

export interface Collection {
  id: string
  name: string
}

export interface Currency {
  id: string
  symbol: string
  decimals: number
}

export interface Nft {
  id: string
  collection: Collection
  tokenId: string
  tokenURI: string
}

export interface Frac {
  id: string
  name: string
  symbol: string
  totalSupply: string
  exitPrice: string
  timestamp: number
  decimals: number
  released: boolean
  paymentToken: Currency
  target: Nft
}

export interface UserFrac {
  balance: string
  vaultBalance: string
  redeemAmount: string
  frac: Frac
}

export interface UserFracsByOwnerVarsV1 {
  owner: string
  name?: string
  orderField: string
  orderDirection: string
  first?: number
  skip?: number
}

export interface UserFracsByOwnerDataV1 {
  userFracs: UserFrac[]
}

export const USER_FRACS_BY_OWNER_QUERY_V1 = gql`
  query UserFracsByOwner($owner: Bytes, $orderField: UserFrac_orderBy, $orderDirection: OrderDirection, $first: Int = 8, $skip: Int = 0) {
    userFracs(where: { owner: $owner }, orderBy: $orderField, orderDirection: $orderDirection, first: $first, skip: $skip) {
      balance
      vaultBalance
      redeemAmount
      frac {
        id
        name
        symbol
        totalSupply
        exitPrice
        timestamp
        decimals
        released
        paymentToken {
          id
          symbol
          decimals
        }
        target {
          id
          collection {
            id
            name
            symbol
          }
          tokenId
          tokenURI
        }
      }
    }
  }
`
