import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function ShoppingProductTile({product}) {
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div>
                <div className="relative">
                    <img 

                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
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
                            product?.salePrize > 0 ? <span className="text-lg font-bold text-primary">${product.salePrize}</span>  : null
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full hover:bg-green-400 hover:text-black'>Add To Cart</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ShoppingProductTile;