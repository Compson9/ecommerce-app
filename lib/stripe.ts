import Stripe from "stripe"
// check if stripe is available
if(!process.env.STRIPE_SECRET_KEY){
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia" 

})

export default stripe

// The stripe details