import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutnUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shope/cart-slice";
import { Label } from "../ui/label";


import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";


function MenuItem() {

        const navigate = useNavigate();
        const location = useLocation();
        const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCurrentMenuItem) {

    
        sessionStorage.removeItem('filters');
        const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' && getCurrentMenuItem.id !== 'search' ?
        {
            categories : [getCurrentMenuItem.id]
        } : null
    
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    
        location.pathname.includes('listing') && currentFilter !== null ? 
        setSearchParams(new URLSearchParams(`?categories=${getCurrentMenuItem.id}`)) :
        navigate(getCurrentMenuItem.path);
        console.log('filter : ', location.pathname);
        
    }

    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(menuItem => <Label onClick={() => handleNavigate(menuItem)} className='text-sm font-medium cursor-pointer text-black dark:text-white' key={menuItem.id} >{menuItem.label}</Label>)
        }
    </nav >
}





function RightHeaderContent() {

    const { user } = useSelector(state => state.auth);
    const [ openCartSheet, setOpenCartSheet ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.shopeCart);


    const { theme, toggleTheme } = useTheme();


    function handleLogout() {
        dispatch(logoutnUser());
    }

    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])


    return <div className="flex flex-col lg:items-center lg:flex-row gap-4">
        <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-black border-2 bg-gray-300 dark:bg-gray-700 dark:text-white"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button onClick={() => setOpenCartSheet(true)} variant='outline' className='text-black dark:text-white relative' size='icon'>
                <ShoppingCart className="w-6 h-6" />
                <span className='absolute top-[-5px] right-[2px] text-sm font-bold'>{cartItems?.items?.length}</span>
                <span className="sr-only">Cart</span>
            </Button>
            <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}  />
        </Sheet>

        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className='bg-black'>
                    <AvatarFallback className='bg-black text-white dark:bg-violet-900 font-extrabold'>
                        {user?.userName?.[0]?.toUpperCase() || "BR"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' className='w-56'>
                <DropdownMenuLabel>Logged In As {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/shope/account")}>
                    <UserCog className='mr-2 w-4 h-4' />
                    <span className="font-bold">Account</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='mr-2 w-4 h-4 text-red-600' />
                    <span className="font-bold text-red-600">Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div >
}

function ShoppingHeader() {


    return <header className="sticky top-0 h-16 z-40 w-full border-b bg-background ">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
            <Link to="/shope/home" className="flex items-center gap-2 text-black dark:text-white" >
                <HousePlug className="h-6 w-6" />
                <span className="font-bold">ECOMMERCE</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild >
                    <Button variant='outline' size='icon' className='lg:hidden text-black dark:text-white'>
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Toggle Header Menu</span>
                    </Button>
                </SheetTrigger >
                <SheetContent side='left' className='w-full max-w-xs'>
                    <MenuItem />
                    <RightHeaderContent />
                </SheetContent>
            </Sheet >
            <div className="hidden lg:block">
                <MenuItem />
            </div>
            {
                <div className="hidden lg:block">
                    <RightHeaderContent />
                </div>
            }
        </div >
    </header >
}

export default ShoppingHeader;