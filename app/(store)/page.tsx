import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";


export default async function Home(){
  const products = (await getAllProducts()) || [];
  const categories = (await getAllCategories()) || [];

  return(
    <div className="pt-60"> 
      <BlackFridayBanner/>
      <div className="flex flex-col items-center justify-top min-h-screen p-16 ">
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  )
}



