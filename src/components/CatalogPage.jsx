import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wands } from '../data/wands';
import { useCart } from '../context/CartContext';
import './CatalogPage.css';

const CatalogPage = () => {
  const [filteredWands, setFilteredWands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setFilteredWands(wands);
  }, []);

  useEffect(() => {
    let result = wands;
    
    if (selectedCategory !== 'all') {
      result = result.filter(wand => wand.alignment === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(wand => 
        wand.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredWands(result);
  }, [selectedCategory, searchTerm]);

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

  return (
    <div className="catalog-page">
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
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </div>
        </div>
      </nav>
      
      <header className="catalog-header">
        <h1>Wand Catalog</h1>
        <p>Browse our magical collection</p>
      </header>
      
      <main className="catalog-main">
        <div className="catalog-filters">
          <div className="filter-section">
            <label htmlFor="category-filter">Category:</label>
            <div className="rune-button-group">
              <button 
                className={`rune-button ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              <button 
                className={`rune-button good-alignment ${selectedCategory === 'good' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('good')}
              >
                Good
              </button>
              <button 
                className={`rune-button neutral-alignment ${selectedCategory === 'neutral' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('neutral')}
              >
                Neutral
              </button>
              <button 
                className={`rune-button evil-alignment ${selectedCategory === 'evil' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('evil')}
              >
                Evil
              </button>
            </div>
          </div>
          
          <div className="filter-section">
            <label htmlFor="search-filter">Search:</label>
            <input
              id="search-filter"
              type="text"
              placeholder="Search wands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="wand-grid">
          <div className="wand-count">
            Showing {filteredWands.length} of {wands.length} wands
          </div>
          {filteredWands.length > 0 ? (
            filteredWands.map(wand => (
              <div key={wand.id} className="wand-card">
                <div className="wand-image-placeholder">Wand Image</div>
                <div className="wand-info">
                  <h3>{wand.name}</h3>
                  <span className={`rarity-badge ${getRarityClass(wand.rarity)}`}>
                    {wand.rarity.charAt(0).toUpperCase() + wand.rarity.slice(1)}
                  </span>
                  <span className={`alignment-badge ${getAlignmentClass(wand.alignment)}`}>
                    {wand.alignment.charAt(0).toUpperCase() + wand.alignment.slice(1)}
                  </span>
                  <p className="wand-price">GP {wand.price}</p>
                  <Link to={`/product/${wand.id}`} className="view-details-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-wands-found">No wands found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;