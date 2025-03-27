import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="flex min-h-screen w-screen">
            {/* Left Side: Welcome Section */}
            <div className="hidden lg:flex items-center justify-center flex-grow bg-black">
                <div className="max-w-lg space-y-6 text-center text-primary-foreground dark:text-white px-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Welcome to Ecommerce Shopping
                    </h1>
                </div>
            </div>

            {/* Right Side: Form Section */}
            <div className="flex items-center justify-center flex-grow bg-background">
                <div className="w-full max-w-sm space-y-6 px-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
