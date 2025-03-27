import { logoutnUser } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";


function AdminHeader({ setOpen }) {

  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();


  function handleLogout() {
    dispatch(logoutnUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)} className="block lg:hidden">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 ml-8 rounded-full text-black border-2 bg-gray-300 dark:bg-gray-700 dark:text-white"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
      <div className="flex flex-1 justify-end">
        <button onClick={handleLogout} className="inline-flex gap-2 items-center rounded-md px-4 py-2 mr-8 text-small font-medium shadow">
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  )
}

export default AdminHeader;