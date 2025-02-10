import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import axios from "axios";



function ProductImageUpload({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState}) {

    const inputRef = useRef(null);



    function handleImagefileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
        
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);

    }

    function handleRemoveImage() {
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = '';
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
        console.log(response, "response");
        
        if(response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false)
        }
    } 

    useEffect(() => {
        if(imageFile !== null) uploadImageToCloudinary()
    }, [imageFile])

    return (
        <div className="w-full max-w-md mx-auto">
            <Label className="text-lg font-semibold  mb-2 block mt-4">Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input 
                    id='image-upload'
                    type="file" 
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImagefileChange}
                 />
                 {
                    
                    !imageFile ?
                    
                         <Label htmlFor="image-upload"  className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                        <UploadCloud className="w-5 h-5 text-muted-foreground mb-2" />
                        <span>Drag & Drop or click to upload image</span>
                    </Label> : 
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 mr-2 text-primary" />
                        </div>                            
                        <p className="text-sm font-medium">{imageFile.name}</p>
                        <button variant='ghost' size='icon' className="text-muted-foreground bg-red-50 hover:text-foreground" onClick={handleRemoveImage}>
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </button>
                    </div>
                 }
            </div>
        </div>
    )
}

export default ProductImageUpload;