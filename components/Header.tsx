"use client"

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { SignedIn } from "@clerk/clerk-react";


export default function Header() {
    const {user} = useUser();
    const createClerkPasskey = async() => {
 try {
  const response = await user?.createPasskey()
  console.log(response);
  
 } catch (err) {
  console.error("Error:", JSON.stringify(err, null, 2))
 }
    }

  return (
    <header className="flex flex-wrap justify-between items-center py-4 px-6">
    {/* Top row of the Header */}
    <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700 cursor-pointer mx-auto sm:mx-0">
            NovaMart
        </Link>
        <Form
            action="/search" 
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
            <input
                type="text"
                name="query"
                placeholder="Search for products"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            />
        </Form>

 {/* Left side of the header */}

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
        <Link
            href="/cart"
            className="flex relative flex-1 justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            <TrolleyIcon className="w-6 h-6"/>
            {/* Span items count when the global state is implemented */}
            <span>Cart</span>
        </Link>
        
        {/* User profile on the navbar */}
        <ClerkLoaded>
          <SignedIn>
            <Link href="/order" 
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <PackageIcon className="w-6 h-6"/>
              <span>Orders</span>
            </Link>
            </SignedIn>
          
           {user ? (
            <div className="flex gap-4 items-center justify-center">
              <UserButton />
              <div className="hidden sm:block text-sx">
                <p className="text-gray-400">Welcome Back!</p>
                <p className="font-bold">{user.fullName}</p>
              </div>
            </div>
           ): (
            <SignInButton mode="modal"/>
           )}
          {user?.passkeys.length === 0 && (
            <button
            onClick={createClerkPasskey}
              className="bg-white hover:bg-blue-700 text-blue-500 hover:text-white animate-pulse font-bold py-2 px-2 border-blue-300 border"
            >
             Create passkey 
            </button>
          )}

        </ClerkLoaded>
        </div>
       
    </div>
</header>
  )
}
