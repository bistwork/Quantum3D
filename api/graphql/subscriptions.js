/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
        __typename
      }
      accounting {
        fullName
        phone
        email
        taxExempt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
        __typename
      }
      accounting {
        fullName
        phone
        email
        taxExempt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
        __typename
      }
      accounting {
        fullName
        phone
        email
        taxExempt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $userId: String
  ) {
    onCreateCustomer(filter: $filter, userId: $userId) {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $userId: String
  ) {
    onUpdateCustomer(filter: $filter, userId: $userId) {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $userId: String
  ) {
    onDeleteCustomer(filter: $filter, userId: $userId) {
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
