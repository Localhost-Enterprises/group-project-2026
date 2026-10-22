import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BackButton, Typography } from '@/components';
import { useProducts } from '@/entities/product/model/product.queries';
import type { Order } from '@/shared/types/Order';

import styles from './OrderHistoryPage.module.scss';

export const OrderHistoryPage = () => {
  const { t } = useTranslation();

  const [orders, setOrders] = useState<Order[]>([]);
  const { data: products = [] } = useProducts();

  useEffect(() => {
    document.title = `${t('orderHistoryTitle')} | NICE GADGETS`;
  }, [t]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orderHistory');

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders(savedOrders ? (JSON.parse(savedOrders) as Order[]) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <main className={styles.container}>
      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>

      <Typography
        className={styles.title}
        variant="h2"
      >
        {t('orderHistoryTitle')}
      </Typography>

      {orders.length === 0 ?
        <Typography
          className={styles.empty}
          variant="bodytext"
        >
          {t('orderHistoryEmpty')}
        </Typography>
      : <div className={styles.list}>
          {orders.map((order) => (
            <article
              key={order.id}
              className={styles.order}
            >
              <div className={styles.column}>
                <Typography
                  variant="bodytext"
                  className={styles.columnTitle}
                >
                  {t('orderHistoryProducts')}
                </Typography>

                <div className={styles.columnInfo}>
                  {order.products.map((item, index) => {
                    const product = products.find(
                      (product) => product.id === item.productId,
                    );
                    return (
                      <Typography
                        variant="smalltext"
                        className={styles.columnInfoText}
                        key={`${item.productId}-${index}`}
                      >
                        {product?.name ??
                          t('orderHistoryProductFallback', {
                            id: item.productId,
                          })}{' '}
                        × {item.quantity}
                      </Typography>
                    );
                  })}
                </div>
              </div>

              <div className={styles.column}>
                <Typography
                  variant="bodytext"
                  className={styles.columnTitle}
                >
                  {t('orderHistoryTotalQuantity')}
                </Typography>
                <div className={styles.columnInfo}>
                  <Typography
                    className={styles.columnInfoText}
                    variant="smalltext"
                  >
                    {order.products.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </Typography>
                </div>
              </div>

              <div className={styles.column}>
                <Typography
                  variant="bodytext"
                  className={styles.columnTitle}
                >
                  {t('orderWaybill')}
                </Typography>
                <div className={styles.columnInfo}>
                  <Typography
                    className={styles.columnInfoText}
                    variant="smalltext"
                  >
                    {order.ttn}
                  </Typography>
                </div>
              </div>
            </article>
          ))}
        </div>
      }
    </main>
  );
};
