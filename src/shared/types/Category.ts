export const Category = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessory',
} as const;

export type Category = (typeof Category)[keyof typeof Category];
