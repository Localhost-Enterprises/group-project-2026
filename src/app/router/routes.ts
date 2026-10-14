export const ROUTES = {
  HOME: '/',
  CATALOG: '/:catalogSlug',
  PRODUCT: '/:catalogSlug/:productSlug',
  FAVOURITES: '/favourites',
  CART: '/cart',
  CHECKOUT: '/chekout',
  NOTFOUND: '*',
} as const;

export const routePaths = {
  catalog: (catalogSlug: string) => `/${encodeURIComponent(catalogSlug)}`,

  product: (catalogSlug: string, productSlug: string) =>
    `/${encodeURIComponent(catalogSlug)}/${encodeURIComponent(productSlug)}`,
};
