export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        <h1>Главный экран</h1>
      </section>
      <section id="problems" className="min-h-screen bg-gray-light">
        <h2>Проблемы</h2>
      </section>
      <section id="how-we-work" className="min-h-screen">
        <h2>Как работаем</h2>
      </section>
      <section id="cases" className="min-h-screen bg-gray-light">
        <h2>Кейсы</h2>
      </section>
      <section id="products" className="min-h-screen">
        <h2>Услуги</h2>
      </section>
      <section id="about" className="min-h-screen bg-gray-light">
        <h2>О нас</h2>
      </section>
      <section id="cta" className="min-h-screen">
        <h2>Записаться</h2>
      </section>
    </div>
  );
}
