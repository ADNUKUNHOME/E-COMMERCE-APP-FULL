import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/commen/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AddProductFormElements } from "@/config";
import { deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";


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




function Adminproducts() {

    const [ openCreateProductDialoge, setopenCreateProductDialoge ] = useState(false);
    const [ formData, setFormData ] = useState(initialFormData);
    const [ imageFile, setImageFile ] = useState(null);
    const [ uploadedImageUrl, setUploadedImageUrl ]  = useState('');
    const [ imageLoadingState, setImageLoadingState ]  = useState(false);
    const [ currentEditId, setCurrentEditId ] = useState(null);

    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();


    function onSubmit(event) {
        event.preventDefault(); 

        currentEditId !== null ? 
        dispatch(editProduct({
            id : currentEditId, formData
        })).then((data) => {
            
          if(data?.payload?.success) {
            dispatch(fetchAllProducts());
            setopenCreateProductDialoge(false);
            setFormData(initialFormData);
            setCurrentEditId(null);
          }
        }) :


        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl
        })).then((data) => {
            console.log(data);
            if(data?.payload?.success) {
                dispatch(fetchAllProducts());
                setopenCreateProductDialoge(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast({
                    title : 'product added succefullly...'
                })
            }
            
        })  
    }

    function handleDeleteBtn(getProductId) {
        console.log(getProductId);
        
        dispatch(deleteProduct(getProductId)).then((data) => {
            console.log('got product id:', data);
            
            if(data?.payload?.success) {
                dispatch(fetchAllProducts());
            }
        })        
    }

    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key] !== '' ).every((item) => item);
    }

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    

    return <Fragment>
        <div className="mb-5 flex w-full justify-end">
            <button
             className="px-4 py-2 self-start"
             onClick={() => setopenCreateProductDialoge(true)}>Add New Product</button>
        </div>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {
                productList && productList.length > 0 ?
                productList.map(productItem => <AdminProductTile
                         key={productItem._id}
                         setFormData={setFormData} 
                         setopenCreateProductDialoge={setopenCreateProductDialoge} 
                         setCurrentEditId={setCurrentEditId} 
                         product={productItem} 
                         handleDeleteBtn={handleDeleteBtn}
                         /> ) : null 
            }
        </div>
        <Sheet 
        open={openCreateProductDialoge}
        onOpenChange={(isOpen) => {
            setopenCreateProductDialoge(isOpen);
            setCurrentEditId(null);
            setFormData(initialFormData);
        }}
        >
            <SheetContent side='right' className='overflow-auto'>
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditId !== null ? 
                            'Edit Product' : 'Add New Product'
                        }
                    </SheetTitle>
                </SheetHeader>
                <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadedImageUrl={uploadedImageUrl} 
                    setUploadedImageUrl={setUploadedImageUrl} 
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={currentEditId !== null}
                 />
                <div className="py-6">
                    <CommonForm
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={currentEditId !== null ? 'Edit' : 'Add'}
                        formControls={AddProductFormElements}
                        onSubmit={onSubmit}
                        isBtnDisabled={!isFormValid()}

                    />
                </div>
            </SheetContent>

        </Sheet>
    </Fragment>
    
}

export default Adminproducts;