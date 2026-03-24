import { products } from '@/lib/data/products';
import { texts } from '@/lib/data/texts';
import ProductCard from './ProductCard';

const ProductLineSection = () => {
  const { title, subtitle } = texts.productLine;

  return (
    <section id="products" className="bg-gray-50/70 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{subtitle}</p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLineSection;