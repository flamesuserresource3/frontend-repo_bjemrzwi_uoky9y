import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CartPanel() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/cart`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function add(product) {
    setLoading(true);
    await fetch(`${API}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id, qty: 1 }),
    });
    await refresh();
  }

  async function remove(id) {
    setLoading(true);
    await fetch(`${API}/api/cart/${id}`, { method: 'DELETE' });
    await refresh();
  }

  async function checkout() {
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/checkout`, { method: 'POST' });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Checkout failed');
      }
      const data = await res.json();
      setReceipt(data);
      await refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <aside className="sticky top-4 h-fit w-full md:w-80 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md p-5">
      <h3 className="text-lg font-semibold text-gray-900">Your cart</h3>
      {loading && <p className="text-sm text-gray-500 mt-2">Updating…</p>}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <ul className="mt-4 space-y-3">
        {items.length === 0 && (
          <li className="text-sm text-gray-600">Cart is empty. Add something!</li>
        )}
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{it.name}</p>
              <p className="text-xs text-gray-600">{it.qty} × ${it.price.toFixed(2)}</p>
            </div>
            <button
              className="text-xs text-red-600 hover:text-red-700"
              onClick={() => remove(it.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-600">Total</span>
        <span className="text-base font-semibold text-gray-900">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={checkout}
        disabled={items.length === 0 || checkingOut}
        className="mt-4 w-full rounded-lg bg-black text-white py-2 text-sm font-medium disabled:opacity-50"
      >
        {checkingOut ? 'Processing…' : 'Mock Checkout'}
      </button>

      {receipt && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
          <p className="font-medium text-gray-900">Receipt</p>
          <p>Order: {receipt.id}</p>
          <p>Items: {receipt.items?.length}</p>
          <p>Total: ${Number(receipt.total || 0).toFixed(2)}</p>
          <p>Time: {new Date(receipt.timestamp).toLocaleString()}</p>
        </div>
      )}
    </aside>
  );
}
