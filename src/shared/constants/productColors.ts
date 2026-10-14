export const productColors: Record<string, string> = {
  gold: '#FCDBC1',
  midnightgreen: '#5F7170',
  spacegray: '#4C4C4C',
  silver: '#F0F0F0',
};

export const getProductColor = (name: string): string => {
  const key = name.toLowerCase().replace(/[\s-]/g, '');

  return productColors[key] ?? '#B4BDC3';
};
