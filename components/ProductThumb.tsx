import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/sanity.types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function ProductThumb({ product }: { product: Product }) {

  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <div>
      <Link href={`/products/${product.slug?.current}`}
        className={`group flex flex-col bg-white rounded-lg border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
      >
        <div className='relative aspect-square w-full h-full overflow-hidden'>
          {product.image && (
            <Image
              className="object-contain transition-transform duration-300 group-hover:scale-150"
              alt={product.name || "Product Image"}
              src={imageUrl(product.image).url()}
              width={500} // Set a default width
              height={500} // Set a default height
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {isOutOfStock && (
            <div className='absolute inset-0 flex flex-center justify-center items-center bg-black bg-opacity-50'>
              <span className='text-white font-bold text-lg'>
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}