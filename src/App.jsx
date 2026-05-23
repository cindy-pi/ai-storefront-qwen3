import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import ProductDetail from './components/ProductDetail';
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/OrderConfirmation';
import { CartProvider } from './context/CartContext';
import { GoldProvider } from './context/GoldContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <GoldProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </div>
        </GoldProvider>
      </CartProvider>
    </Router>
  );
}

export default App;