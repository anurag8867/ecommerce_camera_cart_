let productRepo = require('../repositories/product');

class ProductService {

    async addProduct({ name, description, price, make, userId, product }) {
        let getProduct = await productRepo.getProduct(name, description, price, make, userId, product);
        if (getProduct) throw {
            message: "This product is already added to database, no duplicate products can be added",
            status: 409
        }
        return await productRepo.addProducts(
            {
                name,
                description,
                price,
                make,
                user_id: userId
            }, product
        );
    }

    async addProductToCart(productId, userId, cart, product) {
        let productsAddedToCart = await productRepo.getProductsAddedCart(
            userId, cart, product
        );
        if (productsAddedToCart && productsAddedToCart.length) {
            for (let index = 0; index < productsAddedToCart.length; index++) {
                if (productsAddedToCart[index]["dataValues"]["id"] === productId) {
                    throw {
                        message: "This product is already added to cart",
                        status: 409
                    }
                }
            }
        }
        return await productRepo.addProductsToCart(
            { product_id: productId, user_id: userId }, cart
        );
    }


    async getProductsFromCart({ userId, cart, product }) {
        return await productRepo.getProductsAddedCart(
            userId, cart, product
        );
    }

    async getProducts(product) {
        return await productRepo.getProducts(null, product);
    }
}

module.exports = new ProductService();