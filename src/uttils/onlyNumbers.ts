export const onlyNumbers = (str: string) => {
  return /^[0-9.,]+$/.test(str);
}
