import { Category, Product } from "@/sanity.types"
import ProductGrid from "./ProductGrid"
import { CategorySelectorComponent } from "./ui/category-selector"

interface ProductViewProps {
    products: Product[],
    categories: Category[],
}

export default function ProductView({ products, categories }: ProductViewProps) {
    return (
        <div className="flex flex-col">
            {/* Categories fetch */}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories}/>
            </div>
            {/* Products Fetch */}
            <div className="">
                <div className="container mx-auto px-0">
                    <ProductGrid products={products} />
                    {/* <hr className="w-1/2 sm:w-3/4" /> */}
                </div>
            </div>
        </div>
    )
}
