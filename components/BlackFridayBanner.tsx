
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
      description: "Welcome to this years Largest Black Friday Sale"
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
          <p className='text-left text-xl sm:text-3xl font-semibold mb-6'>
            {mockSalesData[0].description}
          </p>
          <div className='flex'>
            <div className='bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300'>
              <span className='font-bold text-base sm:text-xl text-red-600'>
                {mockSalesData[0].couponCode}
              </span>
            <span className='ml-2 font-bold text-base sm:text-xl'>
            for  {mockSalesData[0].discountAmount} % OFF
            </span>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
