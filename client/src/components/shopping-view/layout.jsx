import ShoppingHeader from "./header";

import { Outlet } from "react-router-dom";


function ShoppingLayout() {
    return(
        <div className="flex flex-col h-screen w-screen bg-white overflow-hidden">
            <ShoppingHeader/>
            <main className="flex-grow w-full h-full overflow-auto">
                <Outlet/>
            </main>
        </div>
    )
}

export default ShoppingLayout;