import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ wands }) => {
  const { id } = useParams();
  const wand = wands.find(w => w.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!wand) {
    return (
      <div className="product-detail-page">
        <div className="not-found">
          <h2>Wand Not Found</h2>
          <p>The wand you're looking for doesn't exist in our collection.</p>
          <Link to="/catalog" className="cta-button">Browse Catalog</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getRarityBadgeClass = (rarity) => {
    switch(rarity) {
      case 'common': return 'common-rarity';
      case 'uncommon': return 'uncommon-rarity';
      case 'rare': return 'rare-rarity';
      case 'very rare': return 'very-rare-rarity';
      case 'legendary': return 'legendary-rarity';
      default: return 'common-rarity';
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <div className="wand-image-placeholder">
            Wand Image
          </div>
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{wand.name}</h1>
          <div className="alignment-badge {wand.alignment}-alignment">
            {wand.alignment.charAt(0).toUpperCase() + wand.alignment.slice(1)}
          </div>
          <div className="rarity-badge {getRarityBadgeClass(wand.rarity)}">
            {wand.rarity}
          </div>
          
          <p className="product-description">{wand.description}</p>
          
          <div className="product-meta">
            <div className="product-price">{wand.price} GP</div>
            <div className="product-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity"
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          
          <div className="product-actions">
            <button 
              className={`add-to-cart-button ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? 'Added to Cart! ✨' : 'Add to Cart'}
            </button>
            <Link to="/catalog" className="back-button">← Back to Catalog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;