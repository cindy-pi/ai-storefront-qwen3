import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

const CatalogPage = ({ wands }) => {
  const [selectedAlignment, setSelectedAlignment] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const alignments = ['all', 'good', 'neutral', 'evil'];
  const rarities = ['all', 'common', 'uncommon', 'rare', 'very rare', 'legendary'];

  const filteredWands = wands.filter(wand => {
    const matchesAlignment = selectedAlignment === 'all' || wand.alignment === selectedAlignment;
    const matchesRarity = selectedRarity === 'all' || wand.rarity === selectedRarity;
    const matchesSearch = wand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          wand.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAlignment && matchesRarity && matchesSearch;
  });

  const handleAlignmentFilter = (alignment) => {
    setSelectedAlignment(alignment);
  };

  const handleRarityFilter = (rarity) => {
    setSelectedRarity(rarity);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Wand Catalog</h1>
        <p>Explore our collection of enchanted wands</p>
      </div>
      
      <div className="catalog-main">
        {/* Filters section */}
        <div className="catalog-filters">
          <div className="filter-section">
            <label>Search:</label>
            <input 
              type="text" 
              placeholder="Search wands..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="filter-section">
            <label>Alignment:</label>
            <div className="filter-buttons">
              {alignments.map(alignment => (
                <button
                  key={alignment}
                  className={`filter-button ${selectedAlignment === alignment ? 'active' : ''}`}
                  onClick={() => handleAlignmentFilter(alignment)}
                >
                  {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <label>Rarity:</label>
            <div className="filter-buttons">
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  className={`filter-button ${selectedRarity === rarity ? 'active' : ''}`}
                  onClick={() => handleRarityFilter(rarity)}
                >
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wand grid */}
        <div className="wand-grid">
          {filteredWands.length > 0 ? (
            filteredWands.map(wand => (
              <div key={wand.id} className={`wand-card ${wand.alignment}-alignment`}>
                <div className="wand-image-placeholder">
                  Wand Image
                </div>
                <div className="wand-info">
                  <h3>{wand.name}</h3>
                  <div className="alignment-badge {wand.alignment}-alignment">
                    {wand.alignment.charAt(0).toUpperCase() + wand.alignment.slice(1)}
                  </div>
                  <div className="rarity-badge {getRarityBadgeClass(wand.rarity)}">
                    {wand.rarity}
                  </div>
                  <p>{wand.description}</p>
                  <div className="wand-price">{wand.price} GP</div>
                  <Link to={`/product/${wand.id}`} className="view-details-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-wands-found">
              No wands match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;