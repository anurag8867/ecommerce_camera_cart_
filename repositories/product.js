class ProductRepo {

    async addProducts(model, product) {
        return await product.create(model);
    }

    async addProductsToCart(model, cart) {
        return await cart.create(model);
    }

    async getProductsAddedCart(userId, cart, product) {
        return await cart.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: product,
                where: { deleted_at: null },
                required: true
            }]
        });
    }

    async getProducts(userid, product) {
        let searchQuery = {
            deleted_at: null
        };
        if (userid) searchQuery['uuid'] = userid;
        return await product.findAll({ where: searchQuery });

    }

    async getProduct(name, description, price, make, userId, product) {
        let searchQuery = {
            deleted_at: null,
            name,
            price,
            make,
            description,
            user_id: userId
        };
        return await product.findOne({ where: searchQuery });
    }
}

module.exports = new ProductRepo();