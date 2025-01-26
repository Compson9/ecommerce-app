export function formatCurrency(
    amount: number,
    currencyCode: string = "usd"
){
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode.toUpperCase(), 
        }).format(amount);
    } catch (error) {
        // Log the error and return the amount as is
        console.error("Error formatting currency:", error);
    }
}