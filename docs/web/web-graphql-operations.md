# GraphQL Operations Structure

This document describes the GraphQL operations organization following enterprise best practices for scalability and maintainability.

## 📁 Directory Structure

```
web/src/lib/graphql/
├── operations/                 # All GraphQL operations organized by domain
│   ├── customer/              # Customer-related operations
│   │   ├── queries.ts        # Customer queries
│   │   ├── mutations.ts      # Customer mutations
│   │   └── index.ts          # Re-exports
│   ├── product/              # Product-related operations
│   │   ├── queries.ts        # Product queries
│   │   ├── mutations.ts      # Product mutations
│   │   └── index.ts          # Re-exports
│   ├── dashboard/            # Dashboard-related operations
│   │   ├── queries.ts        # Dashboard queries
│   │   └── index.ts          # Re-exports
│   └── index.ts              # Centralized exports
├── fragments/                 # Reusable GraphQL fragments
│   └── common.ts             # Common field fragments
├── types.ts                  # TypeScript type definitions
├── client.ts                 # Apollo Client configuration
├── GraphQLProvider.tsx       # React context provider
└── (legacy files removed)    # Deprecated files have been removed
```

## 🚀 Usage Examples

### Importing Operations

```typescript
// Import specific operations
import { GET_CUSTOMERS, CREATE_CUSTOMER } from '@/lib/graphql/operations';

// Import from specific domain
import { GET_PRODUCTS } from '@/lib/graphql/operations/product';

// Import all operations
import * as CustomerOps from '@/lib/graphql/operations/customer';
```

### Using with Apollo Client

```typescript
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS, CREATE_CUSTOMER } from '@/lib/graphql/operations';

function CustomerList() {
  const { data, loading, error } = useQuery(GET_CUSTOMERS);
  const [createCustomer] = useMutation(CREATE_CUSTOMER);

  // Component logic...
}
```

## 🏗️ Best Practices

### 1. **Domain-Based Organization**
- Group operations by business domain (customer, product, dashboard)
- Separate queries and mutations into different files
- Use index files for clean imports

### 2. **Fragment Reusability**
- Define common field fragments in `fragments/common.ts`
- Use fragments to avoid field duplication
- Compose complex queries from smaller fragments

### 3. **Naming Conventions**
- Queries: `GET_*`, `FETCH_*`
- Mutations: `CREATE_*`, `UPDATE_*`, `DELETE_*`
- Fragments: `*_FIELDS`
- Use descriptive, consistent names

### 4. **Type Safety**
- Define TypeScript interfaces in `types.ts`
- Use generated types when possible
- Export response types for each operation

### 5. **File Organization**
- One operation per file for complex queries
- Group related operations in the same file
- Use clear, descriptive file names

## 🔄 Migration from Legacy Structure

The legacy `queries.ts` file has been removed. All imports now use the new domain-based structure.

### Current Structure:
```typescript
import { GET_CUSTOMERS } from '@/lib/graphql/operations';
// or
import { GET_CUSTOMERS } from '@/lib/graphql/operations/customer';
```

## 📈 Scalability Benefits

1. **Better Tree Shaking**: Import only what you need
2. **Reduced Bundle Size**: Unused operations are excluded
3. **Easier Maintenance**: Changes are isolated to specific domains
4. **Team Collaboration**: Multiple developers can work on different domains
5. **Code Reusability**: Fragments can be shared across operations
6. **Type Safety**: Better TypeScript support with domain-specific types

## 🛠️ Adding New Operations

### 1. Create Domain Files (if new domain):
```bash
mkdir web/src/lib/graphql/operations/new-domain
touch web/src/lib/graphql/operations/new-domain/queries.ts
touch web/src/lib/graphql/operations/new-domain/mutations.ts
touch web/src/lib/graphql/operations/new-domain/index.ts
```

### 2. Add Operations:
```typescript
// operations/new-domain/queries.ts
import { gql } from '@apollo/client';
import { NEW_DOMAIN_FIELDS } from '../../fragments/common';

export const GET_NEW_DOMAINS = gql`
  ${NEW_DOMAIN_FIELDS}
  query GetNewDomains {
    newDomains {
      ...NewDomainFields
    }
  }
`;
```

### 3. Export from Index:
```typescript
// operations/new-domain/index.ts
export * from './queries';
export * from './mutations';
```

### 4. Update Main Index:
```typescript
// operations/index.ts
export * from './new-domain';
```

## 🔍 Fragment Guidelines

### When to Create Fragments:
- Fields used in multiple operations
- Complex nested objects
- Fields that might change frequently

### Fragment Naming:
- Use descriptive names: `CUSTOMER_FIELDS`, `PRODUCT_DETAILS`
- Include the entity name
- Use `_FIELDS` suffix for field fragments

### Example:
```typescript
export const CUSTOMER_FIELDS = gql`
  fragment CustomerFields on Customer {
    id
    name
    email
    status
    createdAt
    updatedAt
  }
`;
```

## 🚨 Common Pitfalls

1. **Circular Dependencies**: Avoid importing between domain folders
2. **Fragment Duplication**: Use shared fragments instead of duplicating fields
3. **Missing Exports**: Always export from index files
4. **Inconsistent Naming**: Follow the established naming conventions
5. **Large Files**: Split large files into smaller, focused files

## 📚 Additional Resources

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Fragments Guide](https://graphql.org/learn/queries/#fragments)
- [TypeScript with GraphQL](https://www.apollographql.com/docs/react/development-testing/static-typing/)
