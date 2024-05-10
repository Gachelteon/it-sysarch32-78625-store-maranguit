
import React, { useState, useEffect } from 'react';
import app from './config/firebase.js'; // Import the exported app instance
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const db = getFirestore(app); // Initialize Firestore with the app instance
    const colRef = collection(db, 'products');

    try {
      const snapshot = await getDocs(colRef);
      const productData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Product list:', error);
      setLoading(false);
    }
  };

  return products; // Return the products array
};

export default Products;