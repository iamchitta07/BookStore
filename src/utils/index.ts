// Number Formatter to US Standard
export const numFormatterUS = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const offPrice = (price: number, off: number): number => {
  const discount = Math.max(0, Math.min(100, off));
  const offerPrice = price * (1 - discount / 100);
  return Math.round(offerPrice * 100) / 100;
};