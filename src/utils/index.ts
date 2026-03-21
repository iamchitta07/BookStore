import { colors } from "../constants";

// Number Formatter to US Standard
export const numFormatterUS = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

// Offer Price Calculator
export const offPrice = (price: number, off: number): number => {
  const discount = Math.max(0, Math.min(100, off));
  const offerPrice = price * (1 - discount / 100);
  return Math.round(offerPrice * 100) / 100;
};

// K, M, B, T Formatter
export const formatUsNumber = (value: number): string => {
  const ABS_VALUE = Math.abs(value);

  if (ABS_VALUE <= 9999) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
  ];

  const found = map.find((x) => ABS_VALUE >= x.threshold);

  if (found) {
    const formatted = value / found.threshold;

    const result = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    }).format(formatted);

    return `${result}${found.suffix}`;
  }

  return value.toString();
};

// Hex Color to RGBA
export const hexToRgb = (hex: string): string => {
  let cleanHex = hex.replace(/^#/, "");

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (cleanHex.length !== 6) {
    console.error("Invalid hex color provided to hexToRgb");
    return "rgba(0,0,0,1)";
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},1)`;
};

// Color by Rank
export const colorByRank = (rnk: number): string => {
  return hexToRgb(colors[rnk - 1]);
};
