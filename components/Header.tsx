"use client"

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link";
import Form from "next/form";
import { PackageIcon,  TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";
import useBasketStore from "@/store/store";


export default function Header() {
  const itemCount = useBasketStore((state)=> 
  state.items.reduce((total, item) => total + item.quantity, 0)
  )
    const {user} = useUser();
//     const createClerkPasskey = async() => {
//  try {
//   const response = await user?.createPasskey()
//   console.log(response);
  
//  } catch (err) {
//   console.error("Error:", JSON.stringify(err, null, 2))
//  }
//     }

  return (
    <header className="flex z-30 flex-wrap bg-gray-900 fixed w-full justify-between items-center py-4 px-6">
    {/* Top row of the Header */}
    <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-200 cursor-pointer mx-auto sm:mx-0">
            NovaMart
        </Link>
        
<Form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">   
<div className="bg-white w-full flex px-1 py-1 rounded-full border  overflow-hidden ">
        <input type='text' name="query" placeholder='Search for products...' className="w-full p2 outline-none bg-white pl-4 text-sm" />
        <button type='button'
          className="bg-gray-900 hover:bg-gray-800 transition-all text-white text-sm rounded-full px-5 py-2.5">Search</button>
      </div>
</Form>


 {/* Left side of the header */}

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
        <Link
            href="/cart"
            className="flex relative flex-1 justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-white hover:bg-gray-800 hover:text-white hover:border text-blue-950 font-bold py-2 px-4 rounded"
        >
            <TrolleyIcon className="w-6 h-6"/>
            {/* Span items count when the global state is implemented */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>Cart</span>
        </Link>
        
        {/* User profile on the navbar */}
        <ClerkLoaded>
          <SignedIn>
            <Link href="/order" 
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 font-bold py-2 px-4 rounded  bg-white hover:bg-gray-800 hover:text-white hover:border text-bl"
            >
              <PackageIcon className="w-6 h-6"/>
              <span>Orders</span>
            </Link>
            </SignedIn>
          
           {user ? (
            <div className="flex gap-4 items-center justify-center">
              <UserButton />
              <div className="hidden sm:block text-sx">
                <p className="text-gray-300">Welcome Back!</p>
                <p className="font-bold text-gray-200 ">{user.fullName}</p>
              </div>
            </div>
           ): (
            <div className="text-white font-semibold">
               <SignInButton   mode="modal"/>
            </div>
           
           )}

        </ClerkLoaded>
        </div>
       
    </div>
</header>
  )
}
