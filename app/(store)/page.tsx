import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export default async function Home(){
  const products = (await getAllProducts()) || [];
  const categories = (await getAllCategories()) || [];

  return(
    <div className="pt-28 md:pt-32 lg:pt-32"> {/* Adjust padding to match header height */}
      {/* Render All products */}
      <div className="flex flex-col items-center justify-top h-screen p-20 ">
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  )
}



