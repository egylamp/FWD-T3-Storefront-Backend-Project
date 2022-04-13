# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create [token required] route: '/products' [POST]
- Products by category (args: product category) route: '/products/category/:category' [GET]

#### Users

- Index [token required] route: '/users' [GET]
- Show [token required] route: '/users/:id' [GET]
- Create N[token required] route: '/users' [POST]

#### Orders

- Current Order by user (args: user id)[token required] route: '/orders/:uid' [GET]
- Create [token required] route: '/orders' [POST]
- Show products in an order (args: order id) [token required] route: '/orders/:id/products' [GET]
- Add product to active oder (args: order id) [token required] route: '/orders/:id/products' [POST]
- Completed Orders by user (args: user id)[token required] route: '/orders/:uid/completed' [GET]

## Data Shapes

#### Product

Table: products (id: serial primary key, product_name:varchar, product_price:integer, product_category:varchar)

#### User

Table: users (id: serial primary key, username:varchar, password:varchar, firstname:varchar, lastname:varchar)

#### Orders

Table: orders (id: serial primary key, order_status:varchar, user_id:integer[foreign key to users table])
Table: orders_products (id: serial primary key, quantity:integer, order_id:integer[foreign key to orders table], product_id:integer[foreign key to products table])
