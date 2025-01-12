import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage(
    {params}: {params: Promise<{slug:string}>}) 
{
    const {slug} = await params;
    const products = getProductByCategory(slug);
    const categories = await getAllCategories();




    
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-20">
        <div className="text-3xl font-bold mb-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {slug
        .split('')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1) )
        }
        Collection
      </h1>
      <ProductView products={products} categories={categories} />
        </div>

    </div>
  )
}
