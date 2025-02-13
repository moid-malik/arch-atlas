import ProductList from "@/components/ProductList";
import { getLatestProducts } from "@/services/product";

export default async function Products() {
  const products = await getLatestProducts();
  return (
    <div className="py-44 md:px-20 px-12">
      <div className="space-y-2">
        <span className="font-black text-primary/70">LATEST</span>
        <ProductList products={products} />
      </div>
    </div>
  );
}
