import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import {loadStripe} from '@stripe/stripe-js'


const stripePromise = loadStripe ('pk_test_51PEvNOEoCKfVp71pGchlLLSILQp5clDkfWmBfoh0mvVdoyBfGM6x6AWyd2EchcTruN343g3RrkhPe4MeyLCsyHPj00KmIPxHxC')
export const Product = (props) => {
  const { data } = props;
  if (!data) {
    return null;
  }

  const { id, productName, price, productImage } = data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems[id] || 0;

  const handleClick = async () => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch('http://localhost:4000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }), // Send product name and price to the backend
    });

    if (response.ok) {
      // If the request is successful, retrieve the session ID from the response
      const session = await response.json();

      // Redirect the user to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        // If there is an error during the redirect, display the error message
        setError(result.error.message);
      }
    } else {
      // If there is an error creating the checkout session, display an error message
      setError('Error creating checkout session');
    }
  };

  return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>P{price}</p>
      </div>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};
