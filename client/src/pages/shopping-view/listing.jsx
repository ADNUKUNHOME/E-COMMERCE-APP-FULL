import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shope/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shope/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function createSearchParamsHelper(filterParams) {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(',');

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    return queryParams.join('&');
}


function ShoppingListing() {

    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(state => state.shopeProducts);
    const [filters, setFilters] = useState(() => {
        return JSON.parse(sessionStorage.getItem('filters')) || {};
    });
    const { cartItems } = useSelector(state => state.shopeCart)
    const [sort, setSort] = useState('price-lowtohigh');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetaisDialog, setOpenDetaisDialog] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { toast } = useToast();
    const categorySearchParam = searchParams.get('categories');

    function handleGetProductDetails(getCurrentId) {
        console.log(getCurrentId);
        dispatch(fetchProductDetails(getCurrentId));

    }

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(sectionId, selectedOption) {
        let updatedFilters = { ...filters };

        if (!Array.isArray(updatedFilters[sectionId])) {
            updatedFilters[sectionId] = [];
        }

        const index = updatedFilters[sectionId].indexOf(selectedOption);
        if (index === -1) {
            updatedFilters[sectionId].push(selectedOption);
        } else {
            updatedFilters[sectionId].splice(index, 1);
        }

        setFilters({ ...updatedFilters });
        sessionStorage.setItem('filters', JSON.stringify(updatedFilters));
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


    useEffect(() => {
        setSort('prize-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, [categorySearchParam])

    useEffect(() => {
        const createQueryString = createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(createQueryString));
    }, [filters]);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }, [filters, sort, dispatch]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetaisDialog(true)
    }, [productDetails])



    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="rounded-lg w-full bg-background shadow-sm">
                <div className="flex p-4 items-center justify-between border-b">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{productList?.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm' className='flex items-center gap-1 text-black'>
                                    <ArrowUpDownIcon className="w-4 h-4" />
                                    <span>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-[200px]'>
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map(sortItem => (
                                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
                    {productList && productList.length > 0 ?
                        productList.map(productItem => <ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} key={productItem.id} product={productItem} />)
                        : null
                    }
                </div>
            </div>
            <ProductDetailsDialog open={openDetaisDialog} setOpen={setOpenDetaisDialog} productDetails={productDetails} />
        </div>
    );
}

export default ShoppingListing;
