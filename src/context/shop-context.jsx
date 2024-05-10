import React, { createContext, useState } from "react";
import Products from "../products";

export const ShopContext = createContext(null);

// Helper function to generate the default cart state
const getDefaultCart = () => {
  const productData = Products();
  let cart = {};
  productData.forEach((product) => {
    cart[product.id] = 0; // Initialize each product's quantity to 0
  });
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    const productData = Products();
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = productData.find((product) => product.id === parseInt(itemId));
        if (itemInfo) {
          totalAmount += cartItems[itemId] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prevCart) => ({ ...prevCart, [itemId]: prevCart[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: Math.max(prevCart[itemId] - 1, 0), // Ensure quantity doesn't go below 0
    }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: newAmount >= 0 ? newAmount : 0, // Ensure quantity is non-negative
    }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart()); // Reset the cart to the default state
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};