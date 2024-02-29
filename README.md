# freshprints-node-application

Steps to setup

cd freshprints-node-application


npm install


npm start



# API DOCS

# SKU UPDATE
curl --location 'localhost:3000/api/v1/sku/update' \
--header 'Content-Type: application/json' \
--data '{
    "sku": "FRESH_PRINTS_1",
    "size": "S",
    "quantity": 100,
    "price": 500
}'


#Success Response

{
    "success": true,
    "data": {
        "message": "Operation succeed"
    }
}

#Error Response
{
    "success": false,
    "data": {
        "error": "Bad Request",
        "message": "sku not present in system",
        "statusCode": 400
    }
}



# SKU bulk update
curl --location 'localhost:3000/api/v1/sku/update/bulk' \
--header 'Content-Type: application/json' \
--data '[{
    "sku": "FRESH_PRINTS_1",
    "size": "S",
    "quantity": 100,
    "price": 1000
},
{
    "sku": "FRESH_PRINTS_2",
    "size": "M",
    "quantity": 50,
    "price": 500
}
]'


#Success response
{
    "success": true,
    "data": {
        "message": "Operation succeed"
    }
}


# ORDER API

curl --location 'localhost:3000/api/v1/order' \
--header 'Content-Type: application/json' \
--data '[{
    "sku": "FRESH_PRINTS_1",
    "size": "S",
    "quantity": 100
},
{
    "sku": "FRESH_PRINTS_2",
    "size": "M",
    "quantity": 50
}
]'


#success response
{
    "success": true,
    "data": {
        "message": "we can fullfill your order"
    }
}


#error response
{
    "success": false,
    "data": {
        "error": "Bad Request",
        "message": "We cannot fulfill order",
        "statusCode": 400
    }
}



# ORDER PRICE API

curl --location 'localhost:3000/api/v1/price' \
--header 'Content-Type: application/json' \
--data '[{
    "sku": "FRESH_PRINTS_1",
    "size": "S",
    "quantity": 10
},
{
    "sku": "FRESH_PRINTS_2",
    "size": "M",
    "quantity": 5
}
]'


#Success response
{
    "success": true,
    "data": {
        "message": "we can fullfill your order",
        "totalPrice": 12500
    }
}