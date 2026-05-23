import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

const CatalogPage = () => {
  const [wands, setWands] = useState([]);
  const [filteredWands, setFilteredWands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated wand data - this will be replaced with actual data from issue #2
  useEffect(() => {
    // Mock data - will be replaced with real data
    const mockWands = [
      { id: 1, name: 'Acacia Wand', alignment: 'good', price: 250, image: 'wand1.jpg' },
      { id: 2, name: 'Oak Wand', alignment: 'neutral', price: 300, image: 'wand2.jpg' },
      { id: 3, name: 'Ebony Wand', alignment: 'evil', price: 400, image: 'wand3.jpg' },
      { id: 4, name: 'Willow Wand', alignment: 'good', price: 200, image: 'wand4.jpg' },
      { id: 5, name: 'Maple Wand', alignment: 'neutral', price: 350, image: 'wand5.jpg' },
      { id: 6, name: 'Ash Wand', alignment: 'evil', price: 450, image: 'wand6.jpg' },
      { id: 7, name: 'Hawthorn Wand', alignment: 'good', price: 220, image: 'wand7.jpg' },
      { id: 8, name: 'Poplar Wand', alignment: 'neutral', price: 280, image: 'wand8.jpg' },
      { id: 9, name: 'Yew Wand', alignment: 'evil', price: 500, image: 'wand9.jpg' },
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

  const getAlignmentLabel = (alignment) => {
    switch (alignment) {
      case 'good': return 'Good';
      case 'neutral': return 'Neutral';
      case 'evil': return 'Evil';
      default: return alignment;
    }
  };

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <h1>Wand Catalog</h1>
        <p>Browse our magical collection</p>
      </header>
      
      <main className="catalog-main">
        <div className="catalog-filters">
          <div className="filter-section">
            <label htmlFor="category-filter">Category:</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Alignments</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="evil">Evil</option>
            </select>
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