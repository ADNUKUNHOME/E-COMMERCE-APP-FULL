import CommonForm from "@/components/commen/form";
import { LoginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";


const initialState = {
    email : '',
    password : ''
}

function AuthLogin() {

    const [formData, setFormData] = useState(initialState)
    function onSubmit() {
        
    }

    return <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Login</h1>
                <p className="mt-2">
                    Don't have an account ?
                    <Link className="font-medium text-primary hover:underline" to="/auth/register">  Register</Link>
                </p>
            </div>

            <CommonForm
                formControls={LoginFormControls}
                buttonText={'Login'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
            

        </div>
    
}

export default AuthLogin;