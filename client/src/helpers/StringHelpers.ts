export const capitalizeFirstLetter = (input = ''): string => {
  return input.slice(0, 1).toUpperCase().concat(input.slice(1));
};
