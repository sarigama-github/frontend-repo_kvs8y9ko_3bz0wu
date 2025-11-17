import Spline from '@splinetool/react-spline';

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/80 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          Find direction with a few reflective steps
        </h1>
        <p className="text-white/80 text-lg md:text-xl leading-relaxed">
          A calm, focused mini-journey to help you feel clearer. Answer a handful of gentle questions and receive a concise Direction Summary tailored to you.
        </p>
        <div className="pt-2">
          <button onClick={onStart} className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-black px-6 py-3 font-medium hover:bg-yellow-300 transition">
            Begin your reflection
          </button>
        </div>
      </div>
    </section>
  );
}
