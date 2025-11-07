import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function ProductGrid({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API}/api/product`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-gray-600">Loading products…</div>;
  }
  if (error) {
    return <div className="py-16 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <article key={p.id} className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm p-4 flex flex-col">
            <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center text-indigo-400 text-5xl font-black">
              {p.name.split(' ').map(w => w[0]).join('').slice(0,3)}
            </div>
            <h3 className="mt-3 text-gray-900 font-medium line-clamp-2">{p.name}</h3>
            <p className="mt-1 text-gray-700">${p.price.toFixed(2)}</p>
            <button
              onClick={() => onAdd(p)}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm font-medium hover:bg-indigo-700 transition"
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
