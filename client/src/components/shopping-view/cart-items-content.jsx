import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItemQty } from "@/store/shope/cart-slice";
import { useToast } from "@/hooks/use-toast";


function UserCartItemsContent({ cartItem }) {

    console.log('Cart Items : ', cartItem);


    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const { toast } = useToast();

    function handleDeleteCartItem(getCartItem) {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: 'Cart items is deleted successfully'
                })
            }
        })
    }

    function hadleUpdateQuantity(getCartItem, typeOfAction) {
        dispatch(updateCartItemQty({
            userId: user?.id, productId: getCartItem?.productId,
            quantity: typeOfAction === 'plus' ?
                getCartItem?.quantity + 1 :
                getCartItem?.quantity - 1
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: 'Cart items is updated successfully'
                })
            } else {
                toast({
                    title: 'Failed to update the cart items'
                })
            }
        })
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
                <Button variant='outline' disabled={cartItem?.quantity === 1} className='w-5 h-5 rounded-full text-black hover:text-white hover:bg-black' size='icon' onClick={() => hadleUpdateQuantity(cartItem, 'minus') }>
                    <Minus className="w-4 h-4" />
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{cartItem?.quantity}</span>
                <Button variant='outline' className='w-5 h-5 rounded-full text-black hover:text-white hover:bg-black' size='icon' onClick={() => hadleUpdateQuantity(cartItem, 'plus') }>
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Increase</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
                {(
                    (cartItem?.salePrize > 0 ? cartItem?.salePrize : cartItem?.prize) * cartItem?.quantity
                ).toFixed(2)
                }
            </p>
            <Trash onClick={() => handleDeleteCartItem(cartItem)} className="cursor-pointer mt-1 text-red-600" size={20} />
        </div>
    </div>
}

export default UserCartItemsContent;