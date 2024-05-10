// shop.js
import React from "react";
import Products from "../../products"; // Import the Products component
import { Product } from "./product";
import "./shop.css";

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Demon Slayer Edition</h1>
      </div>
      <div className="products">
        {Products().map((product) => ( // Call Products() to get the array of products
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};