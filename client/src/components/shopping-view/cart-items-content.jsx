import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "@/store/shope/cart-slice";


function UserCartItemsContent({cartItem}) {

    console.log('Cart Items : ', cartItem);
    

    const { userId } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    function handleDeleteCertItem(getCartItem) {
        dispatch(deleteCartItem({ userId : userId, productId : getCartItem?.productId }))
    }




    return <div className="flex items-center space-x-4">
        <img 

        src={cartItem?.image}
        alt={cartItem?.title}
        className='w-20 h-20 rounded object-cover'
        
        />
        <div className="flex-1">
            <h3 className="font-extrabold">{cartItem?.title}</h3>
            <div className="flex items-center gap-3 mt-1">
                <Button variant='outline' className='w-5 h-5 rounded-full text-black hover:text-white hover:bg-black' size='icon'>
                    <Minus className="w-4 h-4"/>
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{cartItem?.quantity}</span>
                <Button variant='outline' className='w-5 h-5 rounded-full text-black hover:text-white hover:bg-black' size='icon'>
                    <Plus className="w-4 h-4"/>
                    <span className="sr-only">Increase</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
                {(
                    (cartItem?.salePrize > 0 ? cartItem?.salePrize : cartItem?.prize ) * cartItem?.quantity
                ).toFixed(2)
                }
            </p>
            <Trash onClick={() => handleDeleteCertItem(cartItem)} className="cursor-pointer mt-1 text-red-600" size={20} />
        </div>
    </div>
}

export default UserCartItemsContent;