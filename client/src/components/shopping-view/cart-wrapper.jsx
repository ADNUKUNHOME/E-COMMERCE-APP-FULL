import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle }  from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";




function UserCartWrapper({cartItems, setOpenCartSheet}) {

    const navigate = useNavigate();

    const totalCartAmount = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum, currentItem) => sum + (
        currentItem?.salePrize > 0 ? currentItem?.salePrize : currentItem?.prize
    ) * currentItem?.quantity, 0 ) : 0;


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
            <span className="font-bold">${totalCartAmount}</span>
        </div>
        <Button onClick={() => {
            navigate('/shope/checkout');
            setOpenCartSheet(false);
        }} className='w-full mt-6 hover:text-black hover:bg-white dark:hover:bg-violet-950 dark:hover:text-white'>Checkout</Button>
    </div>

</SheetContent>
}

export default UserCartWrapper;