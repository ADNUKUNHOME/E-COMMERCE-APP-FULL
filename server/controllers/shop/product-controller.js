const product = require("../../models/product");

const getFilteredProducts = async(req, res) => {
    try {


        console.log("🛠️ Raw Query Params:", req.query);

        const { categories, brands, sortBy = "price-lowtohigh" } = req.query;

        console.log("🛠️ Categories Received:", categories);
console.log("🛠️ Brands Received:", brands);


        let filters = {};

        if (categories && categories.trim() !== "") {
            filters.category = { $in: categories.split(",") };
        }
        if (brands && brands.trim() !== "") {
            filters.brand = { $in: brands.split(",") };
        }
        
        

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.prize = 1
                
                break;
            case "price-hightolow":
                sort.prize = -1
                
                break;
            case "title-atoz":
                sort.title = 1
                
                break;
            case "title-ztoa":
                sort.title = -1
                
                break;
        
            default:
                sort.prize = 1
                break;
        }

        console.log("🛠️ MongoDB Query:", JSON.stringify(filters, null, 2));

        const products = await product.find(filters).sort(sort)

        console.log("🛠️ Fetched Products:", products.length);

        res.status(200).json({
            success: true,
            data: products
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'some error occured'
        })
    }
}


const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = await product.findById(id);

        if(!product) return res.status(404).json({
            success : false,
            message : 'Product not found!'
        })

        res.status(200).json({
            success : true,
            data : productData
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'some error occured'
        })
    }
}


module.exports = { getFilteredProducts, getProductDetails }