import { COUPON_CODES } from "@/sanity/lib/sales/couponCode"
import { getActiveSalesByCouponCode } from "@/sanity/lib/sales/getActiveSalesByCouponCode"


export default async function BlackFridayBanner() {
    const sale = await getActiveSalesByCouponCode(COUPON_CODES.BFRIDAY)


    if (!sale?.isActive) {
        return null;
    } 

  return (
    <div>BlackFridayBanner</div>
  )
}
