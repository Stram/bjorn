export function createEnum(enumDefinition) {
  return Object.assign({}, enumDefinition, {
    values: Object.values(enumDefinition)
  });
}
