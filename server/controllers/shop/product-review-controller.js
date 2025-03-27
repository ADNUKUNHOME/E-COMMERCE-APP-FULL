const Order = require('../../models/orders');
const Product = require('../../models/product');
const ProductReview = require('../../models/review');

const addProductReview = async (req, res) => {
    try {
        

        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

        const order = await Order.findOne({
            userId,
            'cartItems.productId': productId,
            orderStatus: 'Confirmed'
        })

        if (!order) {
            return res.status(403).json({
                success: false,
                message: 'You need to purchase the product to review it.'
            })
        }

        const checkReview = await ProductReview.findOne({ productId, userId });
        console.log(checkReview, 'data get');
        if (checkReview) {
            return res.status(403).json({
                success: false,
                message: 'You already reviewed this product!'
            })
        }

        const newReview = new ProductReview({
            productId, userId, userName, reviewMessage, reviewValue
        });

        await newReview.save();

        const reviews = await ProductReview.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId, { averageReview });

        res.status(200).json({
            success: true,
            data: newReview
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'error occured'
        })
    }
}



const getProductReview = async (req, res) => {
    try {

        const {productId} = req.params;

        const reviews  = await ProductReview.find({productId});

        res.status(200).json({
            success: true,
            data: reviews
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'error occured'
        })
    }
}


module.exports = { addProductReview, getProductReview }