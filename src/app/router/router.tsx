import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { YouMayAlsoLike } from '@/components/organisms/YouMayAlsoLike';

import { MainTemplate } from '@/components/templates';
import {
  CartPage,
  CatalogPage,
  CheckoutPage,
  FavouritesPage,
  HomePage,
  NotFoundPage,
  ProductPage,
} from '@/pages';

export const router = createBrowserRouter([
  {
    element: <MainTemplate />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.PRODUCT, element: <ProductPage /> },
      { path: ROUTES.FAVOURITES, element: <FavouritesPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      {
        path: '/you-may-also-like-preview',
        element: (
          <YouMayAlsoLike
            category="phones"
            currentProductId={57}
          />
        ),
      },
      { path: ROUTES.NOTFOUND, element: <NotFoundPage /> },
    ],
  },
]);
