/**
 * Indian Rupee (₹) Luxury Formatting Utility
 * Formats numbers into standard Indian numbering notation (e.g. ₹1,99,999 or ₹18,50,000)
 */

export const formatINR = (amountInRupees: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amountInRupees);
};

export const formatINRShort = (amountInRupees: number): string => {
  if (amountInRupees >= 10000000) {
    return `₹${(amountInRupees / 10000000).toFixed(2)} Cr`;
  }
  if (amountInRupees >= 100000) {
    return `₹${(amountInRupees / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amountInRupees);
};
