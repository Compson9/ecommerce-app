
export default async function SearchPage({
    searchParams,
}: {
    searchParams: {
        query: string
    }
}
) {
    const {query} = await searchParams;
    

    
  return (
    <div className='pt-20'>
        <h2>Searched Page for {query}</h2>
        </div>
  )
}
