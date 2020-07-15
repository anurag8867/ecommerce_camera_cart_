const chai = require("chai");
const assert = chai.assert;
const product = require('../../../services/product');
const productRepo = require('../../../repositories/product');
const sinon = require('sinon');

describe(`Do not Add Product and give a error message`, () => {
    let data = {
        "uuid": "821f2b72-4efd-49ac-9a25-db237e793834",
        "id": 5,
        "name": "Canon 111",
        "description": "Canon1 NiceOne",
        "price": 1000,
        "make": "Canon",
        "user_id": 1,
        "updated_at": "2020-07-15T05:53:23.492Z",
        "created_at": "2020-07-15T05:53:23.492Z"
    };
    before(function () {
        sinon.stub(productRepo, 'getProduct').resolves(123);
    });
    after(function () {
        productRepo.getProduct.restore(); // Unwraps the spy
    });
    it(`should return an error message 'product is already added to database, no duplicate products can be added'`, async function () {
        try {
            let addedProduct = await product.addProduct({ name: 1, description: 1, price: 1, make: 1, userId: 1, product: 1 });
            console.log(addedProduct);
        } catch (e) {
            assert.equal(e.message, "This product is already added to database, no duplicate products can be added");
            assert.equal(e.status, 409);
        }
    });
});

describe(`Add Product`, () => {
    let data = {
        "uuid": "821f2b72-4efd-49ac-9a25-db237e793834",
        "id": 5,
        "name": "Canon 111",
        "description": "Canon1 NiceOne",
        "price": 1000,
        "make": "Canon",
        "user_id": 1,
        "updated_at": "2020-07-15T05:53:23.492Z",
        "created_at": "2020-07-15T05:53:23.492Z"
    };
    before(function () {
        sinon.stub(productRepo, 'getProduct').resolves(null);
        sinon.stub(productRepo, 'addProducts').resolves(data);
    });
    after(function () {
        productRepo.getProduct.restore(); // Unwraps the spy
        productRepo.addProducts.restore(); // Unwraps the spy
    });

    it(`should return added products to cart`, async function () {
        try {
            let addedProduct = await product.addProduct({
                name: data.name, description: data.description, price: data.price,
                make: data.make, userId: data.user_id, product: 1
            });
            assert.equal(addedProduct.name, data.name);
            assert.equal(addedProduct.id, data.id);
            assert.equal(addedProduct.description, data.description);
            assert.equal(addedProduct.price, data.price);
            assert.equal(addedProduct.make, data.make);
            assert.equal(addedProduct.user_id, data.user_id);
        } catch (e) {
            console.log(e);
        }
    });
});

describe(`Add Product To Cart`, () => {
    let data = {
        "uuid": "2b84377a-363d-4252-9170-249dec43ba7c",
        "id": 1,
        "product_id": 2,
        "user_id": 1,
        "updated_at": "2020-07-15T14:29:48.853Z",
        "created_at": "2020-07-15T14:29:48.853Z"
    };
    before(function () {
        sinon.stub(productRepo, 'getProductsAddedCart').resolves([]);
        sinon.stub(productRepo, 'addProductsToCart').resolves(data);
    });
    after(function () {
        productRepo.getProductsAddedCart.restore(); // Unwraps the spy
        productRepo.addProductsToCart.restore(); // Unwraps the spy
    });

    it(`should return added products to cart`, async function () {
        try {
            let addedProductToCart = await product.addProductToCart({ productId: 2, userId: 1 });
            assert.equal(addedProductToCart.product_id, data.product_id);
        } catch (e) {
            console.log(e);
        }
    });
});

describe(`Do not Add Product To Cart`, () => {
    let data = {
        dataValues: {
            "uuid": "2b84377a-363d-4252-9170-249dec43ba7c",
            "id": 1,
            "product_id": 2,
            "user_id": 1,
            "updated_at": "2020-07-15T14:29:48.853Z",
            "created_at": "2020-07-15T14:29:48.853Z"
        }
    };
    before(function () {
        sinon.stub(productRepo, 'getProductsAddedCart').resolves([data]);
    });
    after(function () {
        productRepo.getProductsAddedCart.restore(); // Unwraps the spy
    });

    it(`should not add product to cart, because product is already present on DB`, async function () {
        try {
            await product.addProductToCart(1, 1);
        } catch (e) {
            assert.equal(e.message, "This product is already added to cart");
        }
    });
});

describe(`Get Products from Cart`, () => {
    let data = {
        "uuid": "2b84377a-363d-4252-9170-249dec43ba7c",
        "id": 1,
        "product_id": 2,
        "user_id": 1,
        "updated_at": "2020-07-15T14:29:48.853Z",
        "created_at": "2020-07-15T14:29:48.853Z"
    };
    before(function () {
        sinon.stub(productRepo, 'getProductsAddedCart').resolves([data]);
    });
    after(function () {
        productRepo.getProductsAddedCart.restore(); // Unwraps the spy
    });

    it(`should get All products added inside cart for this specific user`, async function () {
        try {
            let resp = await product.getProductsFromCart(1);
            assert.equal(resp, data);
        } catch (e) {
        }
    });
});

describe(`Get All Products from Cart`, () => {
    let data = [{
        "uuid": "2b84377a-363d-4252-9170-249dec43ba7c",
        "id": 1,
        "product_id": 2,
        "user_id": 1,
        "updated_at": "2020-07-15T14:29:48.853Z",
        "created_at": "2020-07-15T14:29:48.853Z"
    },
    {
        "uuid": "2b84377a-363d-4252-9170-249dec43ba7c",
        "id": 4,
        "product_id": 3,
        "user_id": 1,
        "updated_at": "2020-07-15T14:29:48.853Z",
        "created_at": "2020-07-15T14:29:48.853Z"
    }];
    before(function () {
        sinon.stub(productRepo, 'getProducts').resolves(data);
    });
    after(function () {
        productRepo.getProducts.restore(); // Unwraps the spy
    });

    it(`should get All products added inside cart for this specific user`, async function () {
        try {
            let resp = await product.getProducts();
            assert.equal(resp, data);
        } catch (e) {
        }
    });
});