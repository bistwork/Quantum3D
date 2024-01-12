/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
      id
      primaryInfo {
        bussinesName
        firstName
        lastName
        email
        primaryPhone
        additionalPhone
        status
      }
      secondaryInfo {
        firstName
        lastName
        email
        primaryPhone
      }
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
        zipcode
      }
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
      id
      primaryInfo {
        bussinesName
        firstName
        lastName
        email
        primaryPhone
        additionalPhone
        status
      }
      secondaryInfo {
        firstName
        lastName
        email
        primaryPhone
      }
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
        zipcode
      }
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createAdminOrder = /* GraphQL */ `
mutation MyMutation($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    # Otros campos que quieras retornar
  }
}
`;
export const updateOrderStatus = /* GraphQL */ `
mutation MyMutation($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
  }
}
`;

export const createOrderNotif = /* GraphQL */ `
mutation MyMutation($input: CreateOrderNotificationInput!) {
  createOrderNotification(input: $input) {
    id
    # Otros campos que quieras retornar
  }
}
`;