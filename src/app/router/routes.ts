export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog/:catalogSlug',
  PRODUCT: '/product/:productSlug',
  FAVOURITES: '/favourites',
  CART: '/cart',
  CHECKOUT: '/chekout',
  NOTFOUND: '*',
} as const;

export const routePaths = {
  catalog: (slug: string) => `/catalog/${encodeURIComponent(slug)}`,
  product: (slug: string) => `/product/${encodeURIComponent(slug)}`,
};
