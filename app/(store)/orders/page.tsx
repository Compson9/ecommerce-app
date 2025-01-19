import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";




export default async function Orders(){

    const {userId} = await auth()

    if(!userId){
        return redirect("/")
    }

    

    return (
        <div>
            <h1>Orders</h1>
        </div>
    )
}