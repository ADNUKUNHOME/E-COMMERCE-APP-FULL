import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle }  from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";




function UserCartWrapper({cartItems}) {

    console.log("Cart Items in Wrapper:", cartItems);


    return <SheetContent className='sm:max-w-md'>
    <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
    </SheetHeader>
    <div className="mt-8 space-y-4">
        {
            cartItems && cartItems.length > 0 ? 
            cartItems.map(item => <UserCartItemsContent cartItem={item} />) : <p>No items in Cart</p>
        }
    </div>
    <div className="mt-8 space-y-4">
        <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$1000</span>
        </div>
        <Button className='w-full mt-6 hover:text-black hover:bg-white'>Checkout</Button>
    </div>

</SheetContent>
}

export default UserCartWrapper;