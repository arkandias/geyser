export const NonNullRelationsPlugin: GraphileConfig.Plugin = {
  name: "NonNullRelationsPlugin",
  description:
    "Makes foreign key fields non-nullable if their columns are all `not null`",
  version: "0.0.0",

  schema: {
    hooks: {
      // Hook a field that has already been defined
      GraphQLObjectType_fields_field(field, build, context) {
        const {
          graphql: { GraphQLNonNull, getNullableType },
          input: { pgRegistry },
        } = build;
        // Extract details about why this field was defined.
        const { isPgSingleRelationField, pgRelationDetails } = context.scope;
        // See if the field was defined for a singular relation
        if (isPgSingleRelationField && pgRelationDetails) {
          // If so, extract details about the relation
          const { codec, relationName } = pgRelationDetails;
          // Look up the relation in the registry
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const relation = pgRegistry.pgRelations[codec.name]?.[relationName];
          if (!relation) {
            return field;
          }
          // Determine if every column is non-null
          const everyColumnIsNonNull = relation.localAttributes.every(
            (attrName) => codec.attributes[attrName]?.notNull,
          );
          if (!relation.isReferencee && everyColumnIsNonNull) {
            // If so, change the type of the field to be non-nullable
            field.type = new GraphQLNonNull(getNullableType(field.type));
          }
        }
        return field;
      },
    },
  },
};
