import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shope/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shope/products-slice";
import { Label } from "../ui/label";
import StarRating from "../commen/star-rating";
import { useEffect, useState } from "react";
import { addNewProductReviews, getProductReviews } from "@/store/shope/review-slice";


function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0);
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopeCart)
    const { reviews } = useSelector(state => state.shopeReview)
    const { toast } = useToast();

    function handleRatingChange(getRating) {
        setRating(getRating)
    }

    function handleAddToCart(getProductId, getTotalStock) {

        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getProductId);
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: 'destructive'
                    })
                    return;
                }
            }
        }

        dispatch(addToCart({ userId: user?.id, productId: getProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: 'Product is Added to Cart',

                })
            }
        })
    }



    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg('');
    }

    function handleAddReview() {
        dispatch(addNewProductReviews({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating
        })).then((data) => {
            if(data.payload.success) {
                setRating(0);
                setRating('');
                dispatch(getProductReviews(productDetails?._id))
                toast({
                    title: 'Review Added Successfully...'
                })
            }

        })
    }

        useEffect(() => {
        if(productDetails !== null) {
            dispatch(getProductReviews(productDetails?._id));
            
        }
    }, [productDetails])

    const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0)
    / reviews.length : 0;




    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg flex justify-center">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        className="w-full max-w-[250px] md:max-w-[350px] lg:max-w-[450px] aspect-square object-cover"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrize ? 'line-through' : ''}`}>${productDetails?.prize}</p>

                        {
                            productDetails?.salePrize > 0 ? <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrize}</p> : null
                        }

                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-0.5">
                            <StarRating rating={averageReview} />
                        </div>
                        <span className="text-muted-foreground">({averageReview.toFixed(1)})</span>
                    </div>
                    <div className="mt-5 mb-5">
                        {
                            productDetails?.totalStock === 0 ? <Button className='hover:bg-white hover:text-black w-full opacity-60 cursor-not-allowed'>
                                Out Of Stock
                            </Button> : <Button onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)} className='hover:bg-white hover:text-black w-full'>
                                Add To Cart
                            </Button>
                        }

                    </div>
                    <Separator />

                    <div className="flex flex-col text-center max-h-[300px] overflow-auto custom-scrollbar">
                        <h2 className="mt-4 mb-4 text-2xl font-bold">Reviews</h2>
                        <div className="grid gap-6">
                            {
                                reviews && reviews.length > 0 ?
                                reviews.map(reviewItem =>  <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>
                                        {reviewItem?.userName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold">{reviewItem?.userName}</h2>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarRating rating={reviewItem?.reviewValue} />
                                    </div>
                                    <p className="text-muted-foreground justify-self-start">{reviewItem?.reviewMessage}</p>
                                </div>
                            </div>) : <h1>No Reviews</h1>
                            }
                        </div>
                        <div className="flex flex-col gap-2 mt-10 mb-20">
                            <Label>Write a Review</Label>
                            <div className="flex gap-1 ml-2">
                                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                            </div>
                            <Input name='reviewMsg' value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} type="text" placeholder="Enter your Review" />
                            <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''} className='hover:bg-white hover:text-black'>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog; 