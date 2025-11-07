import { useRef } from 'react';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';

function App() {
  const gridRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/40 text-gray-900">
      <Navbar />
      <HeroCover />

      <main className="max-w-6xl mx-auto px-6 py-10" id="products" ref={gridRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ProductGrid onAdd={() => { /* handled inside Cart via calling API and refresh */ }} />
          </div>
          <div id="cart">
            <CartPanel />
          </div>
        </div>
      </main>

      <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600 flex items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Vibe Commerce. For screening and demo purposes only.</p>
          <a href="#top" className="hover:text-gray-900">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
