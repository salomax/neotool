import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from '../../fragments/common';

// Product Mutations
export const CREATE_PRODUCT = gql`
  ${PRODUCT_FIELDS}
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      ...ProductFields
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  ${PRODUCT_FIELDS}
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      ...ProductFields
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
