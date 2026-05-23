import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    // Get the most recent order from purchase history
    const history = JSON.parse(localStorage.getItem('fizban_purchase_history') || '[]');
    setPurchaseHistory(history);
    
    if (history.length > 0) {
      const latestOrder = history[history.length - 1];
      setOrder(latestOrder);
    } else {
      // If no order in history, redirect to home
      window.location.href = '/';
    }
  }, []);

  if (!order) {
    return null;
  }

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

  const getProductName = (id) => {
    const product = getProductById(id);
    return product ? product.name : 'Unknown Wand';
  };

  const getProductImage = (id) => {
    const product = getProductById(id);
    return product ? product.image : 'https://placehold.co/100x100?text=Unknown+Wand';
  };

  const orderTotal = order.items.reduce((total, item) => total + (item.quantity * item.priceAtPurchase), 0);

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-content">
        <h1>🎉 Your order has been magically confirmed!</h1>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Order Scroll ID:</strong> {order.orderId}</p>
          <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
          
          <div className="order-items">
            {order.items.map((item, index) => {
              const product = getProductById(item.wandId);
              if (!product) return null;
              
              const itemTotal = item.quantity * item.priceAtPurchase;
              
              return (
                <div key={index} className="order-item">
                  <img src={product.image} alt={product.name} className="item-image" />
                  <div className="item-details">
                    <h3>{product.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Unit Price: {item.priceAtPurchase} GP</p>
                    <p className="item-total">Line Total: {itemTotal} GP</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="order-total">
            <p><strong>Total Cost:</strong> {orderTotal} GP</p>
            <p><strong>Balance After Purchase:</strong> {order.balanceAfter} GP</p>
          </div>
        </div>
        
        <div className="delivery-section">
          <h2>✨ Simulated Magical Delivery ✨</h2>
          <p className="delivery-message">
            *A magical owl bearing the seal of Fizban's Wands has been dispatched to your tower. 
            The following wands have been bound to your magical signature and will arrive by moonrise...*
          </p>
          
          <div className="delivery-items">
            {order.items.map((item, index) => (
              <div key={index} className="delivery-item">
                <img src={getProductImage(item.wandId)} alt={getProductName(item.wandId)} />
                <p className="delivery-item-name">{getProductName(item.wandId)}</p>
                <p className="delivery-item-message">Your wand has been prepared for delivery!</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">Return to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;