export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="bg-primary flex min-h-screen items-center justify-center"
      >
        <h1 className="text-accent text-5xl font-bold">Главный экран</h1>
      </section>
      <section id="problems" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">Проблемы</h2>
      </section>
      <section id="how-we-work" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">Как работаем</h2>
      </section>
      <section id="cases" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">Кейсы</h2>
      </section>
      <section id="products" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">Услуги</h2>
      </section>
      <section id="about" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">О нас</h2>
      </section>
      <section id="cta" className="min-h-screen p-10">
        <h2 className="text-4xl font-bold">Записаться</h2>
      </section>
    </div>
  );
}
