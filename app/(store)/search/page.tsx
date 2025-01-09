import ProductGrid from "@/components/ProductGrid";
import { searchProductByName } from "@/sanity/lib/products/searchProductNyName";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: {
        query: string
    }
}
) {
    const {query} = await searchParams;
    const products = await searchProductByName(query)
    
    if(!products?.length) {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-28 lg:p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full  max-w-4xl font-bold mb-6 text-center">
            <h1>
                No products found for : {query}
            </h1>
            <p className="text-gray-600 text-center">
                Try something with different keywords
            </p>
        </div>
            </div>
        );
    }

    
  return (
    <div className='p-28 lg:p-4 flex flex-col items-center justify-top min-h-screen bg-gray-50 '>
        <h1 className="text-base lg:text-2xl font-bold mb-6 text-center">
        Search Results for : {query}
        </h1>
        <ProductGrid products={products}/>
        </div>
  )
}
