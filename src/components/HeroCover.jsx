import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end md:items-center">
        <div className="mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Vibe Commerce
          </h1>
          <p className="mt-3 md:mt-4 text-gray-600 max-w-xl text-sm md:text-base">
            Minimal, modern shopping experience. Add items to your cart and try a mock checkout — no real payments.
          </p>
        </div>
      </div>
    </section>
  );
}
