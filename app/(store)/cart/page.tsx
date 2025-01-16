"use client"

import useBasketStore from "@/store/store"
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage(){
    const groupItems = useBasketStore((state)=> state.getGroupedItems());
    const {isSignedIn} = useAuth();
    const {user} = useUser();
    const router = useRouter();

    const [isClinent, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if(groupItems.length === 0){
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
                <p className="text-gray-600 text-lg">Your Cart is Empty</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="font-bold mb-4 text-2xl">Your Cart</h1>

        </div>
    )
}