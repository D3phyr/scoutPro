export const checkNumbersInput = str => {
  const regex = /^\+?[0-9\b\s\-\(\)]+$/;
  return str === '' || str === '+' || regex.test(str) ? true : false;
};
