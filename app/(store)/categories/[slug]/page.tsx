import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage(
    {params}: {params: Promise<{slug:string}>}) 
{
    const {slug} = await params;
    const category = getProductByCategory(slug);
    const categories = await getAllCategories()




    
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-20">
        <div className="text-3xl font-bold mb-6 text-center">

        </div>

    </div>
  )
}
