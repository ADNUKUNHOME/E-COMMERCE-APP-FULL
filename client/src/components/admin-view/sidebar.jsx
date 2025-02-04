import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";




function AdminSideBar() {

    const navigate = useNavigate()


    return <Fragment>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
            <div
             onClick={() => navigate("/admin/dashboard")}
             className="flex cursor-pointer items-center gap-2">
            <ChartNoAxesCombined size={30} />
                <h4 className="text-xl font-extrabold">Admin Panel</h4>
            </div>
        </aside>
    </Fragment>
}

export default AdminSideBar;