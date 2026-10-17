import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ProductPurchase.module.scss';

import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';
import { IconButton } from '@/components/molecules';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';

import type { Accessory, Phone, Product, Tablet } from '@/shared/types';
import type { Category } from '@/shared/types/Category';

import { getProductColor } from '@/shared/constants/productColors';
import { AddToCartButton } from '@/features/add-to-cart/ui/AddToCartButton';

import { routePaths } from '@/app/router/routes';
import { productApi } from '@/entities/product/product.api';
import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';

type Props = {
  product: Product;
  productDetails: Phone | Tablet | Accessory;
  className?: string;
};

export const ProductPurchase = ({
  product,
  productDetails,
  className,
}: Props) => {
  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const specs = getProductSpecs(productDetails).slice(0, 4);

  const changeVariant = async (color: string, capacity: string) => {
    if (isChanging) return;

    if (
      color === productDetails.color &&
      capacity === productDetails.capacity
    ) {
      return;
    }

    setIsChanging(true);

    try {
      const variant = await productApi.getByVariant(
        product.category as Category,
        productDetails.namespace_id,
        color,
        capacity,
      );

      if (!variant) {
        throw new Error('Product variant not found');
      }

      navigate(routePaths.product(product.category, variant.id), {
        replace: true,
      });
    } catch (error) {
      throw new Error(`Failed to change product variant: ${error}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className={classNames(styles.itemBlock, className)}>
      <div className={styles.colors}>
        <span>Available colors</span>
        <span className={styles.productId}>ID: {product.id}</span>
      </div>

      <div className={styles.colorOptions}>
        {productDetails.colors_available.sort().map((color) => (
          <button
            key={color}
            type="button"
            disabled={isChanging}
            className={classNames(styles.colorCircle, {
              [styles.selectedColor]: color === productDetails.color,
            })}
            style={{ backgroundColor: getProductColor(color) }}
            onClick={() => changeVariant(color, productDetails.capacity)}
            aria-label={`Select ${color} color`}
            aria-pressed={color === productDetails.color}
          />
        ))}
      </div>

      <div className={styles.capacity}>
        <Typography
          variant="smalltext"
          as="span"
        >
          Select capacity
        </Typography>

        <div className={styles.capacityOptions}>
          {productDetails.capacity_available.map((capacity) => (
            <DefaultButton
              key={capacity}
              disabled={isChanging}
              className={classNames(styles.capacityButton, {
                [styles.selectedCapacity]: capacity === productDetails.capacity,
              })}
              onClick={() => changeVariant(productDetails.color, capacity)}
            >
              <span className={styles.capacityText}>{capacity}</span>
            </DefaultButton>
          ))}
        </div>
      </div>

      <div className={styles.prices}>
        <Typography
          variant="h2"
          as="span"
          className={styles.currentPrice}
        >
          ${product.price}
        </Typography>

        <Typography
          variant="bodytext"
          as="span"
          className={styles.oldPrice}
        >
          <span className={styles.oldPriceValue}>${product.fullPrice}</span>
        </Typography>
      </div>

      <div className={styles.actions}>
        <div className={styles.addToCart}>
          <AddToCartButton productId={product.id} />
        </div>

        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          onClick={() => setIsFavourite((prev) => !prev)}
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
          aria-label="Add to favourites"
        />
      </div>

      <div className={styles.specs}>
        {specs.map((spec) => (
          <div
            key={spec.specName}
            className={styles.specRow}
          >
            <Typography variant="smalltext">{spec.specName}</Typography>

            <Typography variant="smalltext">{spec.specText}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
