import { Activity, Anchor, ArrowRight, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, LibraryBig, Loader, MousePointerBan, ShirtIcon, Tent, UmbrellaIcon, WatchIcon } from 'lucide-react';
import banner from '../../assets/banner.png';
import banner_1 from '../../assets/banner_1.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shope/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shope/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

function ShoppingHome() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [banner, banner_1];
    const { productList, productDetails } = useSelector(state => state.shopeProducts);
    const [openDetaisDialog, setOpenDetaisDialog] = useState(false);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const categoriesWithIcon = [
        { id: "men", label: "Men", icon: ShirtIcon },
        { id: "women", label: "Women", icon: CloudLightning },
        { id: "kids", label: "Kids", icon: BabyIcon },
        { id: "accessories", label: "Accessories", icon: WatchIcon },
        { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
    ];

    const brandWithIcon = [
        { id: "nike", label: "Nike", icon: Anchor },
        { id: "adidas", label: "Adidas", icon: Activity },
        { id: "puma", label: "Puma", icon: Loader },
        { id: "levi", label: "Levi's", icon: Tent },
        { id: "zara", label: "Zara", icon: MousePointerBan },
        { id: "h&m", label: "H&M", icon: LibraryBig },
    ]


    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section]: [getCurrentItem.id]
        }
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shope/listing')
    }

    function handleGetProductDetails(getCurrentId) {
        dispatch(fetchProductDetails(getCurrentId));

    }

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

     useEffect(() => {
            if(productDetails !== null) setOpenDetaisDialog(true)
        }, [productDetails])
    


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])


    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'prize-lowtohigh' }))
    }, [])



    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative flex justify-between w-full h-[600px] overflow-hidden bg-red-100">
                <div className="flex flex-col pl-20 gap-5 items-center justify-center sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-600">
                    <p>We Picked Every Item</p>
                    <p>With Care, <span className='font-bold text-gray-800'>You Must Try</span></p>
                    <p>At least once</p>
                    <button className='py-3 px-7 flex gap-2 text-sm mt-4'>Go To Collections <ArrowRight /></button>
                </div>

                {/* Image Slider */}
                <div className="relative w-[50%] h-full">
                    {slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            className={`absolute justify-self-center object-cover transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            alt="home-banner"
                        />
                    ))}
                </div>

                {/* Slider Buttons */}
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
                    className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-black'
                >
                    <ChevronLeftIcon />
                </Button>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                    className='absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/80 text-black'
                >
                    <ChevronRightIcon />
                </Button>
            </div>

            {/* Categories Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop By Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categoriesWithIcon.map(item => (
                            <Card onClick={() => handleNavigateToListingPage(item, 'categories')} key={item.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
                                <CardContent className='flex flex-col items-center justify-center p-6'>
                                    <item.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className='font-bold'>{item.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mt-8 mb-8 text-center">Shop By Brand</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {brandWithIcon.map(item => (
                            <Card onClick={() => handleNavigateToListingPage(item, 'brands')} key={item.id} className='cursor-pointer hover:shadow-lg transition-shadow'>
                                <CardContent className='flex flex-col items-center justify-center p-6'>
                                    <item.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className='font-bold'>{item.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Shop By Category</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            productList && productList.length > 0 ?
                                productList.map(productItem => <ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={productItem} />)
                                : null
                        }
                    </div>
                </div>
            </section>
            <ProductDetailsDialog open={openDetaisDialog} setOpen={setOpenDetaisDialog} productDetails={productDetails} />
        </div>
    );
}

export default ShoppingHome;
