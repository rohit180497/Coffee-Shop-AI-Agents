import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the cart items
type CartItems = {
  [key: string]: number;  // key is the product ID, value is the quantity
};

interface CartContextType {
  cartItems: CartItems;
  addToCart: (itemKey: string, quantity: number) => void;
  SetQuantityCart: (itemKey: string, quantity: number) => void;
  emptyCart: () => void;
}

// Create a Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  
  const addToCart = (itemKey: string, quantity: number) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [itemKey]: (prevItems[itemKey] || 0) + quantity,
    }));
  };

  const SetQuantityCart = (itemKey: string, delta: number) => {
    setCartItems((prevCartItems) => {
      return {
      ...prevCartItems ,
      [itemKey]: Math.max((prevCartItems[itemKey] || 0) + delta, 0),
      }
    });
  }


  const emptyCart = () => {
    setCartItems({});
}

  return (
    <CartContext.Provider value={{ cartItems, addToCart, SetQuantityCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};