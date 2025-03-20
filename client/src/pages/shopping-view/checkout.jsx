
import Address from '@/components/shopping-view/address';
import accountImg from '../../assets/address.webp'
import { useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';

function ShoppingCheckout() {

    const { cartItems } = useSelector(state => state.shopeCart)

    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
        cartItems.items.reduce((sum, currentItem) => sum + (
            currentItem?.salePrize > 0 ? currentItem?.salePrize : currentItem?.prize
        ) * currentItem?.quantity, 0) : 0;


    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={accountImg} className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
                <Address />
                <div className="flex flex-col gap-4">
                    {
                        cartItems && cartItems.items && cartItems.items.length > 0 ?
                            cartItems.items.map((item, i) => <UserCartItemsContent key={i} cartItem={item} />) : null
                    }
                    <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">${totalCartAmount}</span>
                    </div>
                    <div className="mt-4 w-full">
                        <Button className='w-full hover:bg-slate-50 hover:text-black'>Checkout with paypal</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShoppingCheckout;