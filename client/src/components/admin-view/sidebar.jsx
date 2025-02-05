import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";


export const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'dashboard',
        path: '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id: 'products',
        label: 'products',
        path: '/admin/products',
        icon: <ShoppingBasket />
    },
    {
        id: 'orders',
        label: 'orders',
        path: '/admin/orders',
        icon: <BadgeCheck />
    },

]



function MenuItems() {

    const navigate = useNavigate()

    return <nav
        className="mt-8 flex-col flex gap-2">
        {
            adminSideBarMenuItems.map(menuItem => <div
                key={menuItem.id}
                onClick={() => navigate(menuItem.path)}
                className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuItem.icon}
                <span>{menuItem.label}</span>
            </div>)
        }
    </nav>
}




function AdminSideBar({open, setOpen}) {

    const navigate = useNavigate()


    return <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                        <SheetTitle className="flex gap-2 mt-5 mb-4">
                            <ChartNoAxesCombined size={30} />
                            <h4 className="text-2xl font-extrabold">Admin Panel</h4>
                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems />
                </div>
            </SheetContent>

        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
            <div
                onClick={() => navigate("/admin/dashboard")}
                className="flex cursor-pointer items-center gap-2">
                <ChartNoAxesCombined size={30} />
                <h4 className="text-2xl font-extrabold">Admin Panel</h4>
            </div>
            <MenuItems />
        </aside>
    </Fragment>
}

export default AdminSideBar;