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


function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { toast } = useToast();

    function handleAddToCart(getProductId) {
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
    }


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
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button onClick={() => handleAddToCart(productDetails?._id)} className='hover:bg-white hover:text-black w-full'>
                            Add To Cart
                        </Button>
                    </div>
                    <Separator />

                    <div className="flex flex-col text-center max-h-[300px] overflow-auto custom-scrollbar">
                        <h2 className="mt-4 mb-4 text-2xl font-bold">Reviews</h2>
                        <div className="grid gap-6">
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>
                                        SM
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold">BRAZ LOW</h2>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>
                                        SM
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold">BRAZ LOW</h2>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>
                                        SM
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold">BRAZ LOW</h2>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>
                                        SM
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-bold">BRAZ LOW</h2>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className="text-muted-foreground">This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6 ">
                            <Input type="text" placeholder="Enter your Review" />
                            <Button className='hover:bg-white hover:text-black'>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog; 