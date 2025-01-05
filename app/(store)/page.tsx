
export default async function Home(){
  const products = await getAllProducts();
  return(
    <div className="pt-24">
      {/* Render All products */}

      <h1 className="text-xl">Banner Hero Section</h1>
    </div>
  )
}



