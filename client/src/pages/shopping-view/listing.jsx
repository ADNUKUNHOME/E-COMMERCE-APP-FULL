import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shope/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";


function createSearchParamsHelper(filterParams) {
    const queryParams = []; 

    for(const [ key, value ] of Object.entries(filterParams)) {
    if(Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }}
    return queryParams.join('&');
}


function ShoppingListing() {

    const dispatch = useDispatch();
    const { productList } = useSelector(state => state.shopeProducts)
    const [ filters, setFilters ] = useState({});
    const [ sort, setSort ] = useState(null);
    const [ searchParams, setSearchParams ] = useSearchParams();

    function handleSort(value) {
        setSort(value);
        
    }

    function handleFilter(getSectionId, getCurrectOption) {
        let cpyFilters = { ...filters };
    
        // Ensure the section exists and is always an array
        if (!Array.isArray(cpyFilters[getSectionId])) {
            cpyFilters[getSectionId] = [];
        }
    
        const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrectOption);
    
        if (indexOfCurrentOption === -1) {
            // Add option if not present
            cpyFilters[getSectionId].push(getCurrectOption);
        } else {
            // Remove option if already present
            cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
    
        setFilters(cpyFilters);
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
        
    }

    useEffect(() => {
        if(filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters])

    useEffect(() => {
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
}, []);

    

    useEffect(() => {
        dispatch(fetchAllFilteredProducts())
    }, [dispatch])

    console.log(productList, 'productList');
    

    return <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className="rounded-lg w-full bg-background shadow-sm">
            <div className="flex p-4 items-center justify-between border-b">
                <h2 className="text-lg font-extrabold">All Products</h2>
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{productList?.length} Products</span>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='sm' className='flex items-center gap-1 text-black'>
                            <ArrowUpDownIcon className="w-4 h-4"/>
                            <span>Sort By</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-[200px]'>
                        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                            {
                                sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                            }
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4">
                            {
                                productList && productList.length > 0 ?
                                productList.map(productItem => <ShoppingProductTile key={productItem.id} product={productItem}/>) : null
                            }
            </div>
        </div>
    </div>
}

export default ShoppingListing;