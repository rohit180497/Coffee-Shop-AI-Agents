import { firebaseDB } from '@/config/firebaseConfig'; // Import Firebase Database instance
import { Product } from '@/types/types'; // Import Product type definition
import { ref, get } from 'firebase/database'; // Import Firebase database functions

// Reference to the 'products' path in the Realtime Database
const productRef = ref(firebaseDB, 'products');

// Function to fetch products from the Firebase Realtime Database
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await get(productRef); // Fetch data from the 'products' path
    const data = snapshot.val(); // Extract the raw data from the snapshot

    const products: Product[] = []; // Initialize an empty array for products

    if (data) {
      // Iterate over the data object and populate the products array
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          products.push({ ...data[key] }); // Spread each product into the array
        }
      }
    }

    return products; // Return the array of products
  } catch (error) {
    console.error('Error fetching products:', error); // Log any errors that occur
    throw error; // Rethrow the error for the caller to handle
  }
};

export { fetchProducts }; // Export the fetchProducts function
