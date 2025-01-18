"use client"

import useBasketStore from "@/store/store";
import { useSearchParams } from "next/navigation"
import {useEffect} from "react"



export default function SuccessPage(){
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearBasket = useBasketStore((store)=> state.clearBasket)

    useEffect(() => {
        if(orderNumber){
            clearBasket();
            console.log("Cleared Basket");
            // Redirect to checkout page with order number
        }
    }, [orderNumber, clearBasket])

    return (
<div>

</div>
    )

}