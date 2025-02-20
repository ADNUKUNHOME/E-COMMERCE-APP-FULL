import { logoutnUser } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";


function AdminHeader({setOpen}) {

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutnUser());
  }

    return(
       <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
          <button onClick={() => setOpen(true)} className="block lg:hidden">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
          </button>
          <div className="flex flex-1 justify-end">
            <button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-small font-medium shadow">
            <LogOut />
                Logout
            </button>
          </div>
       </header>
    )
}

export default AdminHeader;