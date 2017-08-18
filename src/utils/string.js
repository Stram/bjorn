export const spaceCase = (value) => value.replace(/([A-Z])/g, ' $1');
export const capitalize = (value) => `${value[0].toUpperCase()}${value.substring(1)}`;
