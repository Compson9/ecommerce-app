

import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";


export default async function ProductPage({params}: { params: Promise<{
    slug: string
}>;
}) {
    const {slug} = await params;
    const product = await getProductBySlug(slug)

    if(!product){
        return notFound();
    }
    

  return (
    <div>Products page</div>
  )
}

