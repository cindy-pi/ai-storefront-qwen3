import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useGold } from '../context/GoldContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { balance, deductGold } = useGold();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Mock product data - in a real app this would come from props or a product context
  const mockProducts = [
    { id: 1, name: "Dragon's Breath Wand", alignment: "Neutral", price: 250, image: "https://placehold.co/100x100?text=Dragon+Wand" },
    { id: 2, name: "Phoenix Feather Wand", alignment: "Good", price: 350, image: "https://placehold.co/100x100?text=Phoenix+Wand" },
    { id: 3, name: "Elder Wand", alignment: "Evil", price: 500, image: "https://placehold.co/100x100?text=Elder+Wand" },
    { id: 4, name: "Wooden Wand", alignment: "Neutral", price: 75, image: "https://placehold.co/100x100?text=Wooden+Wand" }
  ];

  const getProductById = (id) => {
    return mockProducts.find(product => product.id === id);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.wandId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleCheckout = () => {
    if (cartTotal > balance) {
      return;
    }
    
    const success = deductGold(cartTotal);
    if (success) {
      // Save purchase history
      const purchaseHistory = JSON.parse(localStorage.getItem('fizban_purchase_history') || '[]');
      const newOrder = {
        orderId: Math.random().toString(16).slice(2, 10).toUpperCase(),
        timestamp: new Date().toISOString(),
        items: cartItems.map(item => {
          const product = getProductById(item.wandId);
          return {
            wandId: item.wandId,
            quantity: item.quantity,
            priceAtPurchase: product ? product.price : 0
          };
        }),
        total: cartTotal,
        balanceAfter: balance - cartTotal
      };
      
      purchaseHistory.push(newOrder);
      localStorage.setItem('fizban_purchase_history', JSON.stringify(purchaseHistory));
      
      clearCart();
      setCheckoutSuccess(true);
      // Redirect to order confirmation
      window.location.href = '/order-confirmation';
    }
  };

  const getBalanceColor = () => {
    if (cartTotal > balance) {
      return 'text-red-600';
    }
    return 'text-green-600';
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>You haven't added anything to your cart yet.</p>
          <Link to="/catalog" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      {checkoutSuccess ? (
        <div className="checkout-success">
          <p>Order confirmed successfully!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => {
              const product = getProductById(item.wandId);
              if (!product) return null;
              
              const lineTotal = product.price * item.quantity;
              
              return (
                <div key={item.wandId} className="cart-item">
                  <img src={product.image} alt={product.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{product.name}</h3>
                    <p>{product.alignment}</p>
                    <p className="price">Price: {product.price} GP</p>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.wandId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.wandId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    <p>Line Total: {lineTotal} GP</p>
                    <button 
                      className="remove-btn" 
                      onClick={() => removeFromCart(item.wandId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Cart Subtotal:</span>
              <span>{cartTotal} GP</span>
            </div>
            <div className="summary-row">
              <span>Your Gold Balance:</span>
              <span className={getBalanceColor()}>{balance} GP</span>
            </div>
            <div className="summary-row">
              <span>Remaining Gold After Purchase:</span>
              <span className={getBalanceColor()}>{balance - cartTotal} GP</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/catalog" className="btn btn-secondary">Continue Shopping</Link>
              <button 
                className={`btn ${cartTotal > balance ? 'btn-disabled' : 'btn-primary'}`}
                onClick={handleCheckout}
                disabled={cartTotal > balance}
              >
                {cartTotal > balance ? 'Insufficient Gold' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;