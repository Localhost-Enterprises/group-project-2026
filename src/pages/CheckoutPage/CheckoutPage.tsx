import { useEffect, useState } from 'react';
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

export const CheckoutPage = () => {
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
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    document.title = `Checkout | NICE GADGETS`;
  }, []);
  const navigate = useNavigate();

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

    const newErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim(),
      city: !formData.city.trim(),
      warehouse: !formData.warehouse.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    localStorage.setItem('userEmail', formData.email);

    const result = await createNewPostDocument({
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      phone: formData.phone,
      email: formData.email,
      cityRef: formData.cityRef,
      warehouseRef: formData.warehouse,
      paymentMethod: formData.paymentMethod,
      cost: totalAmount,
    });

    if (result.success) {
      try {
        await sendEmail({
          email: formData.email,
          message: `Dear ${formData.firstName} ${formData.lastName},

    Thank you for your order!

    Your order has been successfully placed.

    Tracking number (TTN): ${result.enNumber}
    City: ${formData.city}
    Nova Poshta branch: ${
      warehouses.find((wh) => wh.Ref === formData.warehouse)?.Description ||
      'Not specified'
    }
    Total amount: $${totalAmount}

    Thank you for shopping with NICE GADGETS!

    Best regards,
    NICE GADGETS Team`,
        });
      } catch (error) {
        console.error('Email sending error:', error);
      }

      alert(`Order successfully created! TTN: ${result.enNumber}`);

      clearCart();
      localStorage.removeItem('totalPrice');
      localStorage.removeItem('totalItems');
      localStorage.removeItem('shopping-cart');

      navigate('/');
    } else {
      alert(`Error creating TTN: ${result.errors?.join(', ')}`);
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
          Together
        </Typography>
        <div className={styles.amount}>
          <p>
            {totalCount} {totalCount > 1 ? 'items' : 'item'} for the amount
          </p>
          <Typography variant="h2">{totalAmount} $</Typography>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          I confirm the order
        </button>
      </form>
    </div>
  );
};
