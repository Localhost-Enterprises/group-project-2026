import { useEffect } from 'react';

export const CheckoutPage = () => {
  useEffect(() => {
    document.title = `Checkout | NICE GADGETS`;
  }, []);

  return (
    <>
      <h1>Checkout Page</h1>
    </>
  );
};
