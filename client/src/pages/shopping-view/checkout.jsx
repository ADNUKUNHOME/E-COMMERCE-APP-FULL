
import Address from '@/components/shopping-view/address';
import accountImg from '../../assets/address.webp'
import { useDispatch, useSelector } from 'react-redux';
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shope/order-slice';
import { useToast } from '@/hooks/use-toast';

function ShoppingCheckout() {

    const { cartItems } = useSelector(state => state.shopeCart);
    const { user } = useSelector(state => state.auth);
    const { approvalURL} = useSelector(state => state.shopeOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [ isPaymentStart, setIsPaymentStart ] = useState(false);
    const dispatch = useDispatch();
    const {toast} = useToast();

    const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
        cartItems.items.reduce((sum, currentItem) => sum + (
            currentItem?.salePrize > 0 ? currentItem?.salePrize : currentItem?.prize
        ) * currentItem?.quantity, 0) : 0;


    function handleInitalPaypalPayment() {

        if(cartItems.length === 0) {
            toast({
                title: 'Cart Items are Empty! Please Add Items to Proceed',
                variant: 'destructive'
            })
            return; 
        }

        if(currentSelectedAddress === null) {
            toast({
                title: 'Please Select One Address To Proceed',
                variant: 'destructive'
            })
            return; 
        }


        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map(singleCartItem => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                prize: singleCartItem?.salePrize > 0 ? singleCartItem?.salePrize : singleCartItem?.prize,
                quantity: singleCartItem?.quantity
            })),
            addressInfo: {
                addressId: currentSelectedAddress?._id,
                address: currentSelectedAddress?.address,
                city: currentSelectedAddress?.city,
                pincode: currentSelectedAddress?.pincode,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes
            },
            orderStatus: 'pending',
            paymentMethod: 'paypal',
            paymentStatus: 'pending',
            totalAmount: totalCartAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: '',
            payerId: ''
        }

        dispatch(createNewOrder(orderData)).then((data) => {
            console.log("is it works : ", data);
            if(data?.payload?.success) {
                setIsPaymentStart(true);
            } else {
                setIsPaymentStart(false);
            }

        })

    }

    if(approvalURL) {
        window.location.href = approvalURL;
    }



    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={accountImg} className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
                <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
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
                        <Button onClick={() => handleInitalPaypalPayment()} className='w-full hover:bg-slate-50 hover:text-black'>Checkout with paypal</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShoppingCheckout;