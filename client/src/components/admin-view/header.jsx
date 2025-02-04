import { AlignJustify, LogOut } from "lucide-react";


function AdminHeader() {
    return(
       <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
          <button className="block lg:hidden">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 justify-end">
            <button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-small font-medium shadow">
            <LogOut />
                Logout
            </button>
          </div>
       </header>
    )
}

export default AdminHeader;