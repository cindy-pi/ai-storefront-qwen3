import React, { createContext, useContext, useEffect, useState } from 'react';
import { wands } from '../data/wands';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('fizban_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fizban_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (wand) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.wandId === wand.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.wandId === wand.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { wandId: wand.id, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (wandId) => {
    setCartItems(prevItems => prevItems.filter(item => item.wandId !== wandId));
  };

  const updateQuantity = (wandId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.wandId === wandId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const wand = wands.find(w => w.id === item.wandId);
    if (wand) {
      return total + (wand.price * item.quantity);
    }
    return total;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};