const { cloudinary, ImageUploadUtil } = require("../../helpers/cloudinary");
const product = require("../../models/product");


const handleImageUpload = async (req, res) => {
    try {
        console.log("Received file:", req.file);  // Debugging log

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ success: false, message: "Upload failed", error });
            }
            console.log("Cloudinary Upload Success:", result);
            res.json({ success: true, result });
        }).end(req.file.buffer);

    } catch (error) {
        console.error("Error in handleImageUpload:", error);
        res.status(500).json({ success: false, message: "An error occurred", error });
    }
};


//add a new product

const addProduct = async (req, res) => {
    try {

        const { image, title, description, category, brand, prize, salePrize, totalStock } = req.body;
        const newlyCreatedProduct =  new product({
            image, title, description, category, brand, prize, salePrize, totalStock
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            data : newlyCreatedProduct
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}

//fetch all product

const fetchAllProducts = async (req, res) => {
    try {

        const listOfProducts = await product.find({})
        res.status(200).json({
            success : true,
            data : listOfProducts
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}

//edit product

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, prize, salePrize, totalStock } = req.body;
        
        // ✅ Fix: Ensure the update happens correctly
        const updatedProduct = await product.findByIdAndUpdate(
            id,
            { $set: { image, title, description, category, brand, prize, salePrize, totalStock } },
            { new: true } // ✅ Ensures we get the updated product in response
        );

        if (!updatedProduct) {
            console.error("Product Not Found:", id);
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        console.log("Updated Product in DB:", updatedProduct);
        res.status(200).json({ success: true, data: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Some error occurred..." });
    }
};


//delete product

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received delete request for ID:", id); // Debugging line
        
        const deletedProduct = await product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });

    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Some error occurred..." });
    }
};


module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct }