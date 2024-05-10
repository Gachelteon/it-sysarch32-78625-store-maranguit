import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import Products from "../../products"; // Assuming this is a file that exports an array of product data
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const {
    cartItems,
    getTotalCartAmount,
    checkout,
    removeFromCart,
    addToCart,
    updateCartItemCount,
  } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  const productData = Products(); // Assuming this returns an array of product data

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items">
        {Object.keys(cartItems).map((key) => {
          if (cartItems[key] !== 0) {
            const product = productData.find((p) => p.id === parseInt(key));
            if (product) {
              return (
                <CartItem
                  key={product.id}
                  data={product}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  updateCartItemCount={updateCartItemCount}
                  cartItems={cartItems} // Pass the cartItems object to the CartItem component
                />
              );
            }
          }
          return null;
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: P{totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};