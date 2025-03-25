import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img

                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />

                    {

                        product?.totalStock === 0 ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Out Of Stock</Badge> :
                            product?.totalStock < 10 ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Only {product?.totalStock} items left</Badge> :
                                product.salePrize > 0 ?
                                    <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>Sale</Badge> : null
                    }

                </div>
                <CardContent className='p-4'>
                    <h2 className="text-lg font-bold mb-2">{product?.title}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[16px] text-muted-foreground">{product.category}</span>
                        <span className="text-[16px] text-muted-foreground">{product.brand}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`${product?.salePrize > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product.prize}</span>
                        {
                            product?.salePrize > 0 ? <span className="text-lg font-bold text-primary">${product.salePrize}</span> : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ? (
                        <Button className='w-full hover:bg-white hover:text-black opacity-60 cursor-not-allowed'>Out Of Stock</Button>
                    ) : (
                        <Button onClick={() => handleAddToCart(product?._id, product?.totalStock)} className='w-full hover:bg-white hover:text-black'>Add To Cart</Button>
                    )
                }

            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile;