
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'; // Import Firestore if you're using Firestore
import { PRODUCTS } from './productsData';

const firebaseConfig = {
  apiKey: "AIzaSyBOAnkuwutxqBskofTVx_77E480NxN4AFE",
  authDomain: "it-sysarch32-store-maranguit.firebaseapp.com",
  projectId: "it-sysarch32-store-maranguit",
  storageBucket: "it-sysarch32-store-maranguit.appspot.com",
  messagingSenderId: "706069412927",
  appId: "1:706069412927:web:87666c407a4e746006cc8a",
  measurementId: "G-MXKJQ693L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const addProductsToFirestore = async () => {
    try {
      const productsCollection = firestore.collection('products');
      await Promise.all(PRODUCTS.map(product => productsCollection.doc(product.id.toString()).set(product)));
      console.log('Products added to Firestore successfully.');
    } catch (error) {
      console.error('Error adding products to Firestore:', error);
    }
  };
  
  // Call the function to add products to Firestore
  addProductsToFirestore();