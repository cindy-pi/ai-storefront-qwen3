import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Fizban's Wands</h1>
        <p>Discover the finest magical wands from around the world</p>
      </header>
      
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
        
        <section className="featured-section">
          <h2>Featured Wands</h2>
          <div className="featured-wands">
            {/* These would be populated with actual data from issue #2 */}
            <div className="wand-card">
              <div className="wand-image-placeholder">Wand Image</div>
              <h3>Acacia Wand</h3>
              <p>Good-aligned wand with 10-inch acacia wood</p>
            </div>
            <div className="wand-card">
              <div className="wand-image-placeholder">Wand Image</div>
              <h3>Oak Wand</h3>
              <p>Neutral-aligned wand with 12-inch oak wood</p>
            </div>
            <div className="wand-card">
              <div className="wand-image-placeholder">Wand Image</div>
              <h3>Ebony Wand</h3>
              <p>Evil-aligned wand with 9-inch ebony wood</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;