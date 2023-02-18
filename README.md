# Store App (STC Assignments)

A web application to show Categories with Products for user and the admin can manage this products.

## Features

- Authentication - Basic login form and use static login users for the 2 roles:
  - User => `User Name : user , Password : user `
  - Admin => `User Name : admin , Password : admin `
- Security should be applied to the page to restrict only logged in users who can access it.
  This display will appear depending on the user role as follows:
  - #Admin View
    -- Should display all products in a table (Bonus: use pagination with the data)
  - Admin => `User Name : admin , Password : admin `
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
- RxJS
- NgRx statemanagement
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
