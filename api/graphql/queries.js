/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      companyName
      fullName
      zipCodes
      phone
      additionalPhone
      url
      position
      bussinesAddress
      shipping {
        fullName
        phone
        email
        distance
      }
      accounting {
        fullName
        phone
        email
        taxExempt
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        companyName
        fullName
        zipCodes
        phone
        additionalPhone
        url
        position
        bussinesAddress
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      user {
        id
        email
        companyName
        fullName
        zipCodes
        phone
        additionalPhone
        url
        position
        bussinesAddress
        createdAt
        updatedAt
        owner
        __typename
      }
      userId
      primaryInfo {
        bussinesName
        firstName
        lastName
        email
        primaryPhone
        additionalPhone
        status
        __typename
      }
      secondaryInfo {
        firstName
        lastName
        email
        primaryPhone
        __typename
      }
      mailingAddress {
        address
        city
        state
        zipcode
        __typename
      }
      projectAddress {
        address
        city
        state
        zipcode
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const customersByUserId = /* GraphQL */ `
  query CustomersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mailingAddress {
          address
          city
          state
          zipcode
        }
        primaryInfo {
          additionalPhone
          bussinesName
          email
          firstName
          lastName
          primaryPhone
          status
        }
        projectAddress {
          address
          city
          state
          zipcode
        }
        secondaryInfo {
          email
          firstName
          lastName
          primaryPhone
        }
      }
    }
  }
`;
export const getOrdersByUserId = /* GraphQL */ `
  query getOrdersByUserId($userId: ID!) {
    getCustomer(id: $id) {
      id
      user {
        id
        email
        companyName
        fullName
        zipCodes
        phone
        additionalPhone
        url
        position
        bussinesAddress
        createdAt
        updatedAt
        owner
        __typename
      }
      userId
      primaryInfo {
        bussinesName
        firstName
        lastName
        email
        primaryPhone
        additionalPhone
        status
        __typename
      }
      secondaryInfo {
        firstName
        lastName
        email
        primaryPhone
        __typename
      }
      mailingAddress {
        address
        city
        state
        zipcode
        __typename
      }
      projectAddress {
        address
        city
        state
        zipcode
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const ordersByUserId = /* GraphQL */ `
  query OrdersByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        comercialId
        customer {
          primaryInfo {
            firstName
            lastName
          }
        }
        deliveryDate
        createdAt
        retailAmount
        id
      }
    }
  }
`;
