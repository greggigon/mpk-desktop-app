export const isBlank = (str: string) => {
  return !str || /^\s*$/.test(str);
};

export default { isBlank };
