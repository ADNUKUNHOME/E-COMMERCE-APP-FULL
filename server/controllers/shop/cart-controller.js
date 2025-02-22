const Cart = require("../../models/Cart");
const product = require("../../models/product");


const addToCart = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if(!userId || !productId || quantity <= 0) {
            res.status(400).json({
                success : false,
                message : 'Invalid data provided!'
            })
        }

        const productData = await product.findById(productId);

        if(!productData) {
            res.status(404).json({
                success : false,
                message : 'product not found!'
            })
        }

        let cart = await Cart.findOne({userId});

        if(!cart) {
            cart  = new Cart({ userId, items: []})
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        res.status(200).json({
            success : true, 
            data : cart
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}


const fetchCartItems = async (req, res) => {
    try {

        const {userId} = req.params;

        if(!userId) {
            res.status(400).json({
                success : false,
                message : 'User id is mandetory'
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'item.productId',
            select : 'image title prize salePrize'
        })

        if(!cart) {
            res.status(400).json({
                success : false,
                message : 'Cart not found!'
            })
        }

        const validItems =  cart.items.filter(productItem => productItem.productId);

        if(validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            prize : item.productId.prize,
            salePrize : item.productId.salePrize,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}


const updateCartItemQty = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if(!userId || !productId || quantity <= 0) {
            res.status(400).json({
                success : false,
                message : 'Invalid data provided!'
            })
        }

        const cart = await Cart.findOne({userId})

        if(!cart) {
            res.status(400).json({
                success : false,
                message : 'Cart not found!'
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(findCurrentProductIndex === -1) {
            res.status(404).json({
                success : false,
                message : 'Cart Item Not Present!'
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path : 'items.productId',
            select : "image title prize salePrize"
        })

        const populateCartItems = cart.items.map(item => ({
            productId : item.productId ? item.productId._id :  null, 
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : 'Product not found!',
            prize : item.productId ? item.productId.prize : null,
            salePrize : item.productId ? item.productId.salePrize : null,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}


const deleteCartItem = async (req, res) => {
    try {

        const {userId, productId} = req.params;

        if(!userId || !productId) {
            res.status(400).json({
                success : false,
                message : 'Invalid data provided!'
            })
        }

        const cart = await Cart.findOne({userId}).populate({
                  path : 'item.productId',
            select : 'image title prize salePrize'
        })

        
        if(!cart) {
            res.status(400).json({
                success : false,
                message : 'Cart not found!'
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);

        await cart.save();

       await Cart.populate({
            path : 'item.productId',
            select : 'image title prize salePrize'
        })

        const populateCartItems = cart.items.map(item => ({
            productId : item.productId ? item.productId._id :  null, 
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : 'Product not found!',
            prize : item.productId ? item.productId.prize : null,
            salePrize : item.productId ? item.productId.salePrize : null,
            quantity : item.quantity
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'some error occured...'
        })
    }
}

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    deleteCartItem
}