import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { wands } from '../data/wands';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const foundWand = wands.find(wand => wand.id === parseInt(id));
    setProduct(foundWand);
  }, [id]);

  const getAlignmentClass = (alignment) => {
    switch (alignment) {
      case 'good': return 'good-alignment';
      case 'neutral': return 'neutral-alignment';
      case 'evil': return 'evil-alignment';
      default: return '';
    }
  };

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'common': return 'common-rarity';
      case 'uncommon': return 'uncommon-rarity';
      case 'rare': return 'rare-rarity';
      case 'very-rare': return 'very-rare-rarity';
      case 'legendary': return 'legendary-rarity';
      default: return 'common-rarity';
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="product-detail">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">Fizban's Wands</Link>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
      </nav>
      
      <div className="product-detail-header">
        <Link to="/catalog" className="back-link">
          ← Back to Catalog
        </Link>
        <h1>{product.name}</h1>
      </div>
      
      <div className="product-detail-content">
        <div className="product-image">
          <div className="product-image-placeholder">Wand Image</div>
        </div>
        
        <div className="product-info">
          <div className="product-details">
            <div className="product-meta">
              <span className={`rarity-badge ${getRarityClass(product.rarity)}`}>
                {product.rarity.charAt(0).toUpperCase() + product.rarity.slice(1)}
              </span>
              <span className={`alignment-badge ${getAlignmentClass(product.alignment)}`}>
                {product.alignment.charAt(0).toUpperCase() + product.alignment.slice(1)}
              </span>
              <span className="product-price">GP {product.price}</span>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-specs">
              <div className="spec">
                <span className="spec-label">Wood Type:</span>
                <span className="spec-value">{product.woodType}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Core:</span>
                <span className="spec-value">{product.core}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Length:</span>
                <span className="spec-value">{product.length}</span>
              </div>
              <div className="spec">
                <span className="spec-label">Flexibility:</span>
                <span className="spec-value">{product.flexibility}</span>
              </div>
            </div>
            
            <div className="product-history">
              <h3>Wand History</h3>
              <p>{product.history}</p>
            </div>
            
            <div className="product-properties">
              <h3>Magical Properties</h3>
              <ul>
                {product.properties.map((property, index) => (
                  <li key={index}>{property}</li>
                ))}
              </ul>
            </div>
            
            <div className="product-controls">
              <div className="quantity-control">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity"
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <button className={`add-to-cart-button ${isAdded ? 'added' : ''}`} onClick={handleAddToCart}>
                {isAdded ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;