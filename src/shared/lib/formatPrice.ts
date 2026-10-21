export const formatPrice = (
  priceInUsd: number,
  exchangeRate?: number,
  currency: 'USD' | 'UAH' = 'UAH',
): string => {
  if (currency === 'USD' || !exchangeRate || exchangeRate <= 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(priceInUsd);
  }

  const priceInUah = priceInUsd * exchangeRate;

  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(priceInUah);
};
