// import { defineQuery } from "next-sanity";
// import { CouponCode } from "./couponCode";
// import { sanityFetch } from "../live";

// export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
//     const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
//         *[
//             _type == "sales"
//             && isActive == true
//             && couponCode == $couponCode
//         ] | order(validFrom desc) [0]
//     `);

//     try {
//         const activeSale = await sanityFetch({
//             query: ACTIVE_SALE_BY_COUPON_QUERY,
//             params: {
//                 couponCode: couponCode, // Ensure parameter mapping is explicit
//             },
//         });

//         return activeSale?.data || null; // Use optional chaining to handle undefined
//     } catch (error) {
//         console.error("Error fetching active sale by coupon code:", error);
//         return null; // Return null explicitly in case of an error
//     }
// };
