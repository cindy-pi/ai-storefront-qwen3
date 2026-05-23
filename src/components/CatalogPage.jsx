import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

const CatalogPage = () => {
  const [wands, setWands] = useState([]);
  const [filteredWands, setFilteredWands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulated wand data - this will be replaced with actual data from issue #2
  useEffect(() => {
    // Mock data - will be replaced with real data
    const mockWands = [
      { id: 1, name: 'Acacia Wand', alignment: 'good', price: 250, image: 'wand1.jpg', rarity: 'uncommon' },
      { id: 2, name: 'Oak Wand', alignment: 'neutral', price: 300, image: 'wand2.jpg', rarity: 'common' },
      { id: 3, name: 'Ebony Wand', alignment: 'evil', price: 400, image: 'wand3.jpg', rarity: 'rare' },
      { id: 4, name: 'Willow Wand', alignment: 'good', price: 200, image: 'wand4.jpg', rarity: 'uncommon' },
      { id: 5, name: 'Maple Wand', alignment: 'neutral', price: 350, image: 'wand5.jpg', rarity: 'common' },
      { id: 6, name: 'Ash Wand', alignment: 'evil', price: 450, image: 'wand6.jpg', rarity: 'rare' },
      { id: 7, name: 'Hawthorn Wand', alignment: 'good', price: 220, image: 'wand7.jpg', rarity: 'common' },
      { id: 8, name: 'Poplar Wand', alignment: 'neutral', price: 280, image: 'wand8.jpg', rarity: 'uncommon' },
      { id: 9, name: 'Yew Wand', alignment: 'evil', price: 500, image: 'wand9.jpg', rarity: 'very-rare' },
    ];
    
    setWands(mockWands);
    setFilteredWands(mockWands);
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
  }, [selectedCategory, searchTerm, wands]);

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

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'uncommon': return 'Uncommon';
      case 'rare': return 'Rare';
      case 'very-rare': return 'Very Rare';
      case 'legendary': return 'Legendary';
      default: return rarity;
    }
  };

  const getAlignmentLabel = (alignment) => {
    switch (alignment) {
      case 'good': return 'Good';
      case 'neutral': return 'Neutral';
      case 'evil': return 'Evil';
      default: return alignment;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/cart">Cart</Link>
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
          {filteredWands.length > 0 ? (
            filteredWands.map(wand => (
              <div key={wand.id} className="wand-card">
                <div className="wand-image-placeholder">Wand Image</div>
                <div className="wand-info">
                  <h3>{wand.name}</h3>
                  <span className={`rarity-badge ${getRarityClass(wand.rarity)}`}>
                    {getRarityLabel(wand.rarity)}
                  </span>
                  <span className={`alignment-badge ${getAlignmentClass(wand.alignment)}`}>
                    {getAlignmentLabel(wand.alignment)}
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