import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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



function MenuItem() {
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium text-black' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav >
}





function RightHeaderContent() {

    const { user } = useSelector(state => state.auth);
    const [ openCartSheet, setOpenCartSheet ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.shopeCart);



    function handleLogout() {
        dispatch(logoutnUser());
    }

    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])


    return <div className="flex flex-col lg:items-center lg:flex-row gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button onClick={() => setOpenCartSheet(true)} variant='outline' className='text-black' size='icon'>
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">Cart</span>
            </Button>
            <UserCartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}  />
        </Sheet>

        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Avatar className='bg-black'>
                    <AvatarFallback className='bg-black text-white font-extrabold'>
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

    const { isAuthenticated } = useSelector(state => state.auth);

    return <header className="sticky top-0 h-16 z-40 w-full border-b bg-background ">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
            <Link to="/shope/home" className="flex items-center gap-2 text-black" >
                <HousePlug className="h-6 w-6" />
                <span className="font-bold">ECOMMERCE</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild >
                    <Button variant='outline' size='icon' className='lg:hidden text-black'>
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