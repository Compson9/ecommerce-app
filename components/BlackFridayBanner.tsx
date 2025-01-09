
import React from 'react'

export default async function BlackFridayBanner() {
 
  const mockSalesData = [
    {
      couponCode: 'BFRIDAY',
      title: 'Black Friday Sale',
      isActive: true,
      discountAmount: 50,
      validFrom: '2023-11-24',
      validUntil: '2023-11-27',
    },
    // Add more mock sales data if needed
  ];



  return (
    <div className='bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex-1'>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-left mb-4'>
          {mockSalesData[0].title}
          </h2>
          <p></p>
        </div>

      </div>
      
      </div>
  )
}
