import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProductByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className=" mt-16 mx-14 lg:mx-auto lg:mt-2 min-h-screen">
      <div className="container mx-auto px-4 lg:px-2 py-12">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-2">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>

        {/* Products and Categories */}
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
