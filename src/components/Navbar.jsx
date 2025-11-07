export default function Navbar() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-extrabold text-lg tracking-tight">Vibe<span className="text-indigo-600">Commerce</span></div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <a href="#products" className="hover:text-gray-900">Products</a>
          <a href="#cart" className="hover:text-gray-900">Cart</a>
          <a href="#about" className="hover:text-gray-900">About</a>
        </nav>
      </div>
    </header>
  );
}
