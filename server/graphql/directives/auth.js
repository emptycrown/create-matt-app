import { AuthError } from '~/graphql/errors';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

// Adapted from https://blog.apollographql.com/reusable-graphql-schema-directives-131fb3a177d1
// TODO: understand this more
export default class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) {
      return;
    }
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function(...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        // If no auth requirements, resolve normally
        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const { uid } = context;
        switch (requiredRole) {
          case undefined:
          case 'USER': {
            if (!uid) {
              throw new AuthError(`You've got to be logged in for that!`);
            }
            break;
          }
          case 'ADMIN': {
            // TODO
            throw new AuthError('Unauthorized');
          }
          default: {
            throw new Error(`Unrecognized auth role "${requiredRole}"`);
          }
        }

        // All good to go, resolve without error
        return resolve.apply(this, args);
      };
    });
  }
}
