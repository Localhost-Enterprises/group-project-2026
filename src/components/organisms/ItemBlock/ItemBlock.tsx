import classNames from 'classnames';
import styles from './ItemBlock.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';
import { TextButton, IconButton } from '@/components/molecules';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import type { ProductDetails } from '@/shared/types/ProductDetails';
import { getProductColor } from '@/shared/constants/productColors';
import { useState } from 'react';

type ItemBlockProps = {
  product: ProductDetails;
  onAddToCart?: (product: ProductDetails) => void;
};

export const ItemBlock = ({ product, onAddToCart }: ItemBlockProps) => {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);
  const [isFavourite, setIsFavourite] = useState(false);

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className={styles.itemBlock}>
      <div className={styles.colors}>
        <span>Available colors</span>
        <span className={styles.productId}>ID: 802390</span>
      </div>

      <div className={styles.colorOptions}>
        {product.colorsAvailable.map((color) => (
          <button
            key={color}
            type="button"
            className={classNames(styles.colorCircle, {
              [styles.selectedColor]: color === selectedColor,
            })}
            style={{ backgroundColor: getProductColor(color) }}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select ${color} color`}
            aria-pressed={color === selectedColor}
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
          {product.capacityAvailable.map((capacity) => (
            <DefaultButton
              key={capacity}
              className={classNames(styles.capacityButton, {
                [styles.selectedCapacity]: capacity === selectedCapacity,
              })}
              onClick={() => setSelectedCapacity(capacity)}
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
          ${product.priceDiscount}
        </Typography>

        <Typography
          variant="bodytext"
          as="span"
          className={styles.oldPrice}
        >
          <span className={styles.oldPriceValue}>${product.priceRegular}</span>
        </Typography>
      </div>

      <div className={styles.actions}>
        <TextButton
          className={styles.addToCart}
          onClick={() => onAddToCart?.(product)}
        >
          Add to cart
        </TextButton>

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
            key={spec.label}
            className={styles.specRow}
          >
            <Typography variant="smalltext">{spec.label}</Typography>

            <Typography variant="smalltext">{spec.value}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
