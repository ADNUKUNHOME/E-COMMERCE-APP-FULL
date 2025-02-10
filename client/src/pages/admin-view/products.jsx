import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/commen/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AddProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    prize: '',
    salePrize: '',
    totalStock: ''
}

function onSubmit() {
    console.log(formData, 'formData');
    
}


function Adminproducts() {

    const [ openCreateProductDialoge, setopenCreateProductDialoge ] = useState(false);
    const [ formData, setFormData ] = useState(initialFormData);
    const [ imageFile, setImageFile ] = useState(null);
    const [ uploadedImageUrl, setUploadedImageUrl ]  = useState('');
    const [ imageLoadingState, setImageLoadingState ]  = useState(false)


    return <Fragment>
        <div className="mb-5 flex w-full justify-end">
            <button
             className="px-4 py-2 self-start"
             onClick={() => setopenCreateProductDialoge(true)}>Add New Product</button>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4"></div>
        <Sheet 
        open={openCreateProductDialoge}
        onOpenChange={(isOpen) => setopenCreateProductDialoge(isOpen)}
        >
            <SheetContent side='right' className='overflow-auto'>
                <SheetHeader>
                    <SheetTitle>Add New Product</SheetTitle>
                </SheetHeader>
                <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadedImageUrl={uploadedImageUrl} 
                    setUploadedImageUrl={setUploadedImageUrl} 
                    setImageLoadingState={setImageLoadingState}
                 />
                <div className="py-6">
                    <CommonForm
                        formData={formData}
                        setFormData={setFormData}
                        buttonText='Add'
                        formControls={AddProductFormElements}
                        onSubmit={onSubmit}

                    />
                </div>
            </SheetContent>

        </Sheet>
    </Fragment>
    
}

export default Adminproducts;