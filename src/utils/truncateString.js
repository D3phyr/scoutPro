export const truncateString = (str, value) => {
  if (!str) return;
  return `${str.substring(0, value)}${str.length <= value ? '' : '...'}`;
};
