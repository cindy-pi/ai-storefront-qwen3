import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { wands } from '../data/wands';
import './HomePage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [goldBalance, setGoldBalance] = useState(1000);
  const { cartItems, addToCart } = useCart();
  const [featuredWands, setFeaturedWands] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const balance = localStorage.getItem('fizban_gold_balance');
    if (balance) {
      setGoldBalance(parseInt(balance));
    }
    
    // Get 6 random wands for featured section
    const shuffled = [...wands].sort(() => 0.5 - Math.random());
    setFeaturedWands(shuffled.slice(0, 6));
  }, []);

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

  const handleAddToCart = (wand) => {
    addToCart(wand);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">Fizban's Wands</Link>
          <div className="navbar-gold">
            💰 {goldBalance} GP
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </div>
        </div>
      </nav>
      
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Magical Wands Collection</h2>
            <p>Explore our extensive catalog of enchanted wands, each with its own unique properties and history.</p>
            <Link to="/catalog" className="cta-button">
              Browse Wands
            </Link>
          </div>
        </section>
        
        <section className="about-section">
          <h2>About the Shop</h2>
          <p>
            Welcome to Fizban's Wands, where magic comes to life! We specialize in creating the finest wands crafted by 
            master wandmakers. Our collection includes wands for all magical disciplines, from novice to master level, 
            each handcrafted to perfection with magical properties and history.
          </p>
          <p>
            Whether you're a young wizard starting your journey or a seasoned master seeking the perfect wand to 
            complement your spellwork, our shop has the enchanted wand to fulfill your needs.
          </p>
        </section>
        
        <section className="featured-section">
          <h2>Featured Wands</h2>
          <div className="featured-wands">
            {featuredWands.map(wand => (
              <div key={wand.id} className="wand-card">
                <div className="wand-image-placeholder">Wand Image</div>
                <h3>{wand.name}</h3>
                <span className={`rarity-badge ${getRarityClass(wand.rarity)}`}>
                  {wand.rarity}
                </span>
                <span className={`alignment-badge ${getAlignmentClass(wand.alignment)}`}>
                  {wand.alignment.charAt(0).toUpperCase() + wand.alignment.slice(1)}
                </span>
                <p className="wand-price">GP {wand.price}</p>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(wand)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;