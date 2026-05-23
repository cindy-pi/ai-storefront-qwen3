import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import ProductDetail from './components/ProductDetail';

// Mock wand data - will be replaced with real data from issue #2
const mockWands = [
  { id: 1, name: 'Acacia Wand', alignment: 'good', price: 250, description: 'A fine acacia wand with good magical properties', rarity: 'uncommon' },
  { id: 2, name: 'Oak Wand', alignment: 'neutral', price: 300, description: 'A sturdy oak wand, balanced and versatile', rarity: 'common' },
  { id: 3, name: 'Ebony Wand', alignment: 'evil', price: 400, description: 'A powerful ebony wand with dark magical properties', rarity: 'rare' },
  { id: 4, name: 'Willow Wand', alignment: 'good', price: 200, description: 'A gentle willow wand with nature magic', rarity: 'common' },
  { id: 5, name: 'Maple Wand', alignment: 'neutral', price: 350, description: 'A balanced maple wand for versatile magic', rarity: 'uncommon' },
  { id: 6, name: 'Ash Wand', alignment: 'evil', price: 450, description: 'A deadly ash wand with malevolent properties', rarity: 'rare' },
  { id: 7, name: 'Hawthorn Wand', alignment: 'good', price: 220, description: 'A sacred hawthorn wand for protective magic', rarity: 'common' },
  { id: 8, name: 'Poplar Wand', alignment: 'neutral', price: 280, description: 'A mild poplar wand with healing properties', rarity: 'common' },
  { id: 9, name: 'Yew Wand', alignment: 'evil', price: 500, description: 'A fearsome yew wand with powerful dark magic', rarity: 'very rare' },
  { id: 10, name: 'Cedar Wand', alignment: 'good', price: 320, description: 'A noble cedar wand for wisdom magic', rarity: 'uncommon' },
  { id: 11, name: 'Birch Wand', alignment: 'neutral', price: 260, description: 'A flexible birch wand with growth magic', rarity: 'common' },
  { id: 12, name: 'Pine Wand', alignment: 'evil', price: 380, description: 'A sinister pine wand with death magic', rarity: 'rare' },
  { id: 13, name: 'Rosewood Wand', alignment: 'good', price: 420, description: 'A lovely rosewood wand with love magic', rarity: 'rare' },
  { id: 14, name: 'Cypress Wand', alignment: 'neutral', price: 310, description: 'A balanced cypress wand with transformation magic', rarity: 'common' },
  { id: 15, name: 'Boxwood Wand', alignment: 'evil', price: 460, description: 'A cursed boxwood wand with illusion magic', rarity: 'very rare' },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage wands={mockWands} />} />
          <Route path="/product/:id" element={<ProductDetail wands={mockWands} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;