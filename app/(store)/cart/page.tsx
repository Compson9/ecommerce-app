"use client"

import { createCheckOutSession, Metadata } from "@/actions/createCheckOutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store"
import { SignInButton, useAuth, useUser, } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function CartPage(){
    const groupItems = useBasketStore((state)=> state.getGroupedItems());
    const {isSignedIn} = useAuth();
    const {user} = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Wait for client to be mounted
    useEffect(()=> {
        setIsClient(true);
    },[])

    if(!isClient){
        return <Loader/>
    }

    if(groupItems.length === 0){
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl mt-20 font-bold mb-6 text-gray-800">Your Cart</h1>
                <p className="text-gray-600 text-lg">Your Cart is Empty</p>
            </div>
        )
    }

    async function handleCheckout(){
        if(!isSignedIn){
            return setIsLoading(true)
        }

        try {
        const metadata: Metadata ={
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id,
            };

            const checkoutUrl = await createCheckOutSession(groupItems, metadata);

            if(checkoutUrl){
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error checking out", error)
            
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="container mt-24 md:mt-2 xl:mt-2 lg:mt-2 mx-auto p-4 max-w-6xl">
            <h1 className="font-bold mb-4 text-2xl">Your Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {groupItems.map((item)=> (
                        <div key={item.product._id}
                        className="mb-4 p-4 border rounded flex items-center justify-between"
                        >
                            {/* Contains the image on the cart page */}

                            
                            <div className="flex items-center cursor-pointer flex-2 min-w-0"
                            onClick={()=> 
                                router.push(`/products/${item.product.slug?.current}`)
                            }
                            >
                                 <div className="w-20 h-20 sm:h-24 flex-shrink-0 mr-4">
                                {item.product.image && (
                                    <Image
                                    src={imageUrl(item.product.image).url()}
                                    alt={item.product.name ?? "Product Image"}
                                    className="w-full h-full object-cover rounded"
                                    width={96}
                                    height={96}
                                    />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg sm:text-xl font-semibold truncate">
                                    {item.product.name}
                                </h2>
                                <p className="text-sm sm:text-base">
                                    Price: <span>&#8373;</span>
                                    {((item.product.price ?? 0)* item.quantity).toFixed(2)}
                                </p>
                            </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToBasketButton product={item.product}/>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary section */}
                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">Order Summary</h3> 
                    <div>
                        <p className="flex justify-between">
                        <span>Item:</span>
                        <span>
                            {groupItems.reduce((total, item)=> total + item.quantity, 0)}
                        </span>
                        </p>  
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>
                        <span>&#8373;</span> {useBasketStore.getState().getTotalPrice().toFixed(2)}
                        </span>
                        </p>
                    </div>
                    {isSignedIn ? (
                        <button className="mt-4 w-full ng-blue-500 text-white px-4 py-4 rounded bg-gray-900  hover:bg-gray-800 disabled:bg-gray-400"
                        onClick={handleCheckout}
                        >
                            {isLoading ? "processing..." : "checkout"}
                        </button>

                    ): (
                        <SignInButton mode="modal">
                            <button className="mt-4 w-full bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800">
                            Sign in to Checkout
                            </button>
                        </SignInButton>

                    )}

                </div>

                {/* space for fixed checkout on mobile  */}
                <div className="h-64 lg:h-0">


                </div>
                    
            </div>
        </div>
    )
}