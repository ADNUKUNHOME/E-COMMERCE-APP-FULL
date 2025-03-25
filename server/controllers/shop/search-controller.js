const Product = require('../../models/product');


const searchProducts = async (req, res) => {
    try {

        console.log('keyword : ', req.params)

        const { keyword } = req.params;
        if (!keyword || keyword.trim() === '') {
            return res.status(404).json({
                success: false,
                message: 'Keyword is required and must be in String format'
            })
        }

        const regEx = new RegExp(keyword, 'i');

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ]
        }

        const searchResults = await Product.find(createSearchQuery);
        res.status(200).json({
            success: true,
            data: searchResults
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

module.exports = { searchProducts }