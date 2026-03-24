import type { Product } from '@/types';
import { Button } from '@/components/ui';
import { Search, Settings2, TrendingUp, Package } from 'lucide-react';

const iconMap = {
  Search,
  Settings2,
  TrendingUp,
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const IconComponent =
    iconMap[product.icon as keyof typeof iconMap] || Package;

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
        <IconComponent
          className="h-10 w-10 text-primary"
          aria-hidden="true"
        />
      </div>
      <h3 className="mb-3 text-xl font-semibold text-primary">{product.name}</h3>
      <ul className="mb-6 flex-grow list-inside list-disc space-y-2 text-left text-gray-600">
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="mt-auto">
        <a href="#contact" className="block">
          <Button variant="primary" className="w-full">
            {product.ctaLabel}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ProductCard;