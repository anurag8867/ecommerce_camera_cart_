# ecommerce_camera_cart_

        # Language : JavaScript
            * All the functions are accomadated with meaning full names which defines the functionality of the function
    # Api's exposed:
            * POST
                    * SignUp : ```curl --location --request POST 'http://localhost:3008/signup' \
                        --header 'Content-Type: application/json' \
                        --data-raw '{
                        "email": "email11111q1",
                        "password": "password"
                        }'```

                    * Login : ```curl --location --request POST 'http://localhost:3008/login' \
                        --header 'Content-Type: application/json' \
                        --data-raw '{
                        "email": "email11111q1",
                        "password": "password"
                        }'``` 

                    * Add Products: ```curl --location --request POST 'http://localhost:3008/product' \
                        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWwxMTExMXExIiwiaWQiOjF9LCJpYXQiOjE1OTQ3OTAwMTMsImV4cCI6MTU5NTE1MDAxM30.PkMMVwVziyrTVWVdUTkV7jX6Hn5UONsMeRx3pE00QR4' \
                        --header 'Content-Type: application/json' \
                        --data-raw '{
                        "name": "email11111q1",
                        "price": 1250.1,
                        "make": "email11111q1",
                        "description": "password"
                        }'```
                        NOTE: No duplicate product can be added in DB

                    *  Add Products To Cart: ```curl --location --request POST 'http://localhost:3008/productToCart' \
                        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWwxMTExMXExIiwiaWQiOjF9LCJpYXQiOjE1OTQ3OTAwMTMsImV4cCI6MTU5NTE1MDAxM30.PkMMVwVziyrTVWVdUTkV7jX6Hn5UONsMeRx3pE00QR4' \
                        --header 'Content-Type: application/json' \
                        --data-raw '{
                        "productId": 2,
                        }'```
                        NOTE: No duplicate product can be added in cart

                    *  Get Products Added In Cart: ```curl --location --request GET 'http://localhost:3008/productsAddedCart' \
                        --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZW1haWwxMTExMXExIiwiaWQiOjF9LCJpYXQiOjE1OTQ3OTAwMTMsImV4cCI6MTU5NTE1MDAxM30.PkMMVwVziyrTVWVdUTkV7jX6Hn5UONsMeRx3pE00QR4'```


<MYSQL installed is required>

* check your mysql config in default.json config file
* npm run i // to install project dependencies and it will execute the mocha test cases
* node app.js or npm start // to run server, also, it will do all the formalities of mysql(creating schema and tables)

# DB
    # Mysql
        Note: 
            As soon as app.js runs (Fully Automate):
                1. Connection will be made (make sure right db config available in default.json)
                2. A Database of name provided in default.json will be created (Please change the name in default.json if any chance you already have the same schema in your machine)
                3. Tables will be created with sequelize.
