import { useEffect, useRef, useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import {
  fetchCities,
  fetchWarehouses,
  createNewPostDocument,
} from '@/shared/api/novaPoshta';
import type { CityOption, WarehouseOption } from '@/shared/api/novaPoshta';
import styles from './CheckoutPage.module.scss';
import { useCartStore } from '@/entities/cart';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '@/shared/api/sendEmail';
import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { formatPrice } from '@/shared/lib/formatPrice';
import { useCurrencyStore } from '@/shared/store/useCurrencyStore';
import { updateTopSales } from '@/shared/api/topsales';
import type { Order } from '@/shared/types/Order';
import { BackButton } from '@/components/organisms/BackButton/BackButton';
import { t } from 'i18next';

export const CheckoutPage = () => {
  const { data: exchangeRate } = useUsdToUahRate();
  const currency = useCurrencyStore((state) => state.currency);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [successTtn, setSuccessTtn] = useState<string | null>(null);

  const [formData, setFormData] = useState(() => {
    const savedEmail = localStorage.getItem('userEmail') || '';

    return {
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: savedEmail,
      deliveryType: 'nova_poshta_branch',
      city: '',
      cityRef: '',
      warehouse: '',
      paymentMethod: 'cash_upon_receipt',
    };
  });

  const [totalAmount] = useState(() => {
    return Number(localStorage.getItem('totalPrice')) || 0;
  });

  const [totalCount] = useState(() => {
    return Number(localStorage.getItem('totalItems')) || 0;
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [cities, setCities] = useState<CityOption[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Checkout | NICE GADGETS';
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleCityInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      city: value,
      cityRef: '',
      warehouse: '',
    }));

    setWarehouses([]);

    if (value.length >= 2) {
      const result = await fetchCities(value);
      setCities(result);
    } else {
      setCities([]);
    }
  };

  const handleSelectCity = async (cityItem: CityOption) => {
    setFormData((prev) => ({
      ...prev,
      city: cityItem.Description,
      cityRef: cityItem.Ref,
    }));

    setCities([]);

    const warehouseList = await fetchWarehouses(cityItem.Ref);
    setWarehouses(warehouseList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const newErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      phone:
        !formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 12,
      email: !formData.email.trim(),
      city: !formData.city.trim() || !formData.cityRef,
      warehouse: !formData.warehouse.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      localStorage.setItem('userEmail', formData.email);

      if (!exchangeRate || exchangeRate <= 0) {
        alert('Unable to retrieve the exchange rate. Please try again later.');
        return;
      }

      const result = await createNewPostDocument({
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        phone: formData.phone,
        email: formData.email,
        cityRef: formData.cityRef,
        warehouseRef: formData.warehouse,
        paymentMethod: formData.paymentMethod,
        cost: 100,
      });

      if (!result.success) {
        alert(`Error creating TTN: ${result.errors?.join(', ')}`);
        return;
      }

      try {
        await Promise.all(
          cartItems.map((item) =>
            updateTopSales(item.productId, item.quantity),
          ),
        );
      } catch (error) {
        console.error('Failed to update top sales:', error);
      }

      const order: Order = {
        id: crypto.randomUUID(),
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        ttn: result.enNumber,
      };

      const savedOrders: Order[] = JSON.parse(
        localStorage.getItem('orderHistory') || '[]',
      );

      localStorage.setItem(
        'orderHistory',
        JSON.stringify([...savedOrders, order]),
      );

      try {
        await sendEmail({
          email: formData.email,
          message: `Dear ${formData.firstName} ${formData.lastName},

Thank you for your order!

Your order has been successfully placed.

Tracking number (TTN): ${result.enNumber}
City: ${formData.city}
Nova Poshta branch: ${
            warehouses.find((wh) => wh.Ref === formData.warehouse)
              ?.Description || 'Not specified'
          }
Total amount: ${formatPrice(totalAmount, exchangeRate, currency)}

Thank you for shopping with NICE GADGETS!

Best regards,
NICE GADGETS Team`,
        });
      } catch (error) {
        console.error('Email sending error:', error);
      }

      setSuccessTtn(result.enNumber);

      clearCart();
      localStorage.removeItem('totalPrice');
      localStorage.removeItem('totalItems');
      localStorage.removeItem('shopping-cart');
    } catch (error) {
      console.error('Order processing error:', error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        Ordering
      </Typography>

      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        {t('back')}
      </BackButton>

      <form
        onSubmit={handleSubmit}
        className={styles.formCard}
      >
        <div className={styles.section}>
          <Typography
            variant="h3"
            className={styles.subtitle}
          >
            Your contact details
          </Typography>

          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label>First name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.errorInput : ''}
                aria-label="Enter first name"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Last name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.errorInput : ''}
                aria-label="Enter last name"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Middle name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              aria-label="Enter middle name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Mobile phone *</label>
            <div className={styles.phoneInput}>
              <span>+380</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone.replace('+380', '')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 9);

                  setFormData((prev) => ({
                    ...prev,
                    phone: `+380${digits}`,
                  }));

                  if (errors.phone) {
                    setErrors((prev) => ({ ...prev, phone: false }));
                  }
                }}
                placeholder="XXXXXXXXX"
                className={errors.phone ? styles.errorInput : ''}
                aria-label="Enter mobile phone number"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>E-mail *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={errors.email ? styles.errorInput : ''}
              aria-label="Enter email address"
            />
          </div>
        </div>

        <div className={styles.section}>
          <Typography
            variant="h3"
            className={styles.subtitle}
          >
            Delivery
          </Typography>

          <div className={`${styles.fieldGroup} ${styles.relativeContainer}`}>
            <label>City *</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city (e.g., Kyiv)"
              value={formData.city}
              onChange={handleCityInput}
              autoComplete="off"
              className={errors.city ? styles.errorInput : ''}
              aria-label="Enter city"
            />

            {cities.length > 0 && (
              <ul className={styles.dropdownList}>
                {cities.map((item) => (
                  <li
                    key={item.Ref}
                    onClick={() => handleSelectCity(item)}
                    className={styles.dropdownItem}
                  >
                    {item.Description}{' '}
                    {item.AreaDescription ?
                      `(${item.AreaDescription} обл.)`
                    : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>Nova Poshta Branch *</label>
            <select
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              disabled={!warehouses.length}
              className={styles.selectInput}
              aria-label="Select Nova Poshta branch"
            >
              <option value="">
                {warehouses.length ? 'Select branch' : 'Select city first'}
              </option>

              {warehouses.map((wh) => (
                <option
                  key={wh.Ref}
                  value={wh.Ref}
                >
                  {wh.Description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Typography
          variant="h3"
          className={styles.subtitle}
        >
          Order summary
        </Typography>

        <div className={styles.amount}>
          <p>
            {totalCount} {totalCount === 1 ? 'item' : 'items'} for the amount
          </p>

          <Typography variant="h2">
            {formatPrice(totalAmount, exchangeRate, currency)}
          </Typography>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'I confirm the order'}
        </button>
      </form>

      {successTtn && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.successModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="successTitle"
          >
            <div className={styles.successIcon}>✓</div>

            <h2
              id="successTitle"
              className={styles.successTitle}
            >
              Order Successfully Placed!
            </h2>

            <p className={styles.successText}>
              Thank you for shopping with NICE GADGETS. Your order has been
              successfully created.
            </p>

            <div className={styles.ttnBlock}>
              <span className={styles.ttnLabel}>
                Your Tracking Number (TTN)
              </span>
              <strong className={styles.ttnNumber}>{successTtn}</strong>
            </div>

            <button
              type="button"
              className={styles.successButton}
              onClick={() => {
                setSuccessTtn(null);
                navigate('/');
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
