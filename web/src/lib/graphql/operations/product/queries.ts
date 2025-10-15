import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from '../../fragments/common';

// Product Queries
export const GET_PRODUCTS = gql`
  ${PRODUCT_FIELDS}
  query GetProducts {
    products {
      ...ProductFields
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FIELDS}
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
`;
