# Store App (STC Assignments)

A web application to show Categories with Products for user and the admin can manage this products.

## Features

- Authentication - Basic login form and use static login users for the 2 roles keep free to login with one of them
  - User => `User Name : user , Password : user `
  - Admin => `User Name : admin , Password : admin `
- Orders page - a page that show all the orders added in the system and the total price for each
  order and payment method.
- Order details page - a page with the order details (Order Details, Customer Details, products
  details and quantity).
- Create new order - a page to create order expecting to choose from the products page some products
  then open a popup to add the order details.

## Technologies & Packages

Project is created with:

- Angular 15
  - Standalone Components
  - Strong Typed Forms
  - Streamlined Page Title accessibility
  - Ng Optimized Image
- Typescript
- NgRx statemanagement
- RxJS
- ngx-translation
- HTML
- SCSS
- Tailwind CSS
- ngx-progressbar
- ngx-toastr

## Setup

To run this project, install it locally using npm:

```pwsh
cd ./store-app
npm install
npm start
Open your browser on http://localhost:2500/
```
