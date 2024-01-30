/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      role
      email
      tierId
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
        role
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
query MyQuery {
  listCustomers {
    items {
      primaryInfo {
        firstName
        lastName
        primaryPhone
        email
      }
      projectAddress {
        zipcode
      }
      id
    }
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
  query MyQuery(
    $userID: ID!
  ) {
    ordersByUserID(
      userID: $userID
    ) {
      items {
        comercialId
        customerId
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
        status
        url
        model
        height
        materials
        width
        selectedRafterHeaders
        selectedRafterEndCaps
        selectedHead
        selectedEnd
        rafterSize
        rafterAlign
        projection
        postType
        mountMode
        dealerName
        leftAttrs
        rightAttrs
        middleAttrs
        isLatticeMiddle
        mixedRight
        optionalPostCore
      }
    }
  }
`;

export const orderById = /* GraphQL */ `
  query MyQuery($id:ID!){
    getOrder(id: $id) {
      comercialId
      customer {
        mailingAddress {
          address
          city
          state
          zipcode
        }
        projectAddress {
          address
          city
          state
        }
        secondaryInfo {
          primaryPhone
          lastName
          firstName
          email
        }
        primaryInfo {
          primaryPhone
          lastName
          firstName
          email
          bussinesName
        }
      }
      deliveryDate
      createdAt
      width
      status
      selectedRafterHeaders
      selectedRafterEndCaps
      selectedHead
      selectedEnd
      retailAmount
      rafterSize
      rafterAlign
      projection
      postType
      mountMode
      model
      materials
      height
      url
      leftAttrs
      middleAttrs
      rightAttrs
      isLatticeMiddle
      mixedRight
    }
  }      
`;

export const getOrderNotificationsByUserId = /* GraphQL */ `
  query MyQuery($userID: ID = "") {
    orderNotificationsByUserID(userID: $userID) {
      items {
        category
        createdAt
        description
        read
        id
      }
    }
  }
`;
export const getNotificationsByUserId = /* GraphQL */ `
  query MyQuery($userID: ID = "") {
    notificationsByUserID(userID: $userID) {
      items {
        category
        createdAt
        description
        read
        id
      }
    }
  }
`;