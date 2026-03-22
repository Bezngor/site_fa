import { productCategories } from '@/lib/data/products';
import { texts } from '@/lib/data/texts';

export default function ProductLineSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1B2A4A] mb-8 text-center">{texts.products.title}</h2>
        <ul className="max-w-2xl mx-auto space-y-4">
          {productCategories.map((category, index) => (
            <li key={index} className="flex items-center text-lg text-[#1B2A4A]">
              <span className="w-2 h-2 bg-[#F59E0B] rounded-full mr-3" />
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}