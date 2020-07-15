const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const authService = require('./services/auth');
const productService = require('./services/product');
const Sequelize = require('sequelize');
const config = require('config');
const port = config.get('port');
const middleware = require('./middleware');

//This will create the Database via automation if it doesn't exist in mysql'
require('./db/connect');

let sequelize = new Sequelize(config.get('mysql.database'), config.get('mysql.user'), config.get('mysql.password'),
    config.get('mysql'));

// Export app for other routes to use
let app = express();

// Starting point of the server
function main() {
    app.use(bodyParser.urlencoded({ // Middleware
        extended: true
    }));
    app.use(bodyParser.json());

    //SignUp
    app.post('/signUp', async (req, res) => {
        try {
            let missingField = req.body ? req.body.email ? req.body.password ? null : 'password' : 'email' : 'body';
            if (missingField) throw {
                message: `${missingField} field is missing from body params`,
                status: 400
            }
            let { email, password } = req.body;
            let resp = await authService.signup(email, password, user);
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.post('/login', async (req, res) => {
        try {
            let { email, password } = req.body;
            let resp = await authService.login(email, password, user);
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.post('/product', middleware.checkToken, async (req, res) => {
        try {
            let missingField = req.body ? req.body.name ? req.body.description ? req.body.price ? req.body.make ? null : 'make' :
                'price' : 'description' : 'name' : 'body';
            if (missingField) throw {
                message: `${missingField} field is missing from body params`,
                status: 400
            }
            let { name, description, price, make } = req.body;
            let userId = req.decoded.data.id;
            let resp = await productService.addProduct({ name, description, price, make, userId, product });
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.get('/products', async (req, res) => {
        try {
            let resp = await productService.getProducts(product);
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.post('/productToCart', middleware.checkToken, async (req, res) => {
        try {
            let missingField = req.body ? req.body.productId ? null : 'productId' : 'body';
            if (missingField) throw {
                message: `${missingField} field is missing from body params`,
                status: 400
            }
            let { productId } = req.body;
            let userId = req.decoded.data.id;
            let resp = await productService.addProductToCart(productId, userId, cart, product);
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.get('/productsAddedCart', middleware.checkToken, async (req, res) => {
        try {
            let userId = req.decoded.data.id;
            let resp = await productService.getProductsFromCart({ userId, cart, product });
            return res.status(resp && resp.status || 200).send({ resp });
        } catch (e) {
            return res.status(e.status || 500).send({
                message: e.message,
                error: e.error || null,
            });
        }
    });

    app.use(function (req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' })
    });

    sequelize.sync().then(function () {
        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${port}`);
        });
    }).catch(function (error) {
        console.log({ error });
        process.exit(1);
    });
}

main();


const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: Sequelize.STRING,
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: uuidv4()
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
});

const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: uuidv4()
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
});

const cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: uuidv4()
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
});
product.hasOne(cart, { foreignKey: 'product_id' });
cart.belongsTo(product, { foreignKey: 'product_id' });