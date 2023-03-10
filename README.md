# Store App (STC Assignments)

A web application to show Categories with Products for user and the admin can manage this products.

## Features

- Authentication - Basic login form and use static login users for the 2 roles:

  - User => `User Name : user , Password : user `
  - Admin => `User Name : admin , Password : admin `

- Security should be applied to the page to restrict only logged in users who can access it.
  This display will appear depending on the user role as follows:

  - #Admin View

    - Should display all products in a table (Bonus: use pagination with the data)
    - Can add product
    - Can update product
    - Can delete product

  - #User View

    - Show the different categories and under each category show the available products and filters section. (Bonus: use loading while getting the data - changing the products list with animation)
    - For each product card user should see the full data

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
- shared components
- angular material
- HTML
- SCSS
- Tailwind CSS
- ngx-progressbar
- ngx-toastr

## Clone app

git clone `https://github.com/M-Hamo/store-app.git`

## Setup

To run this project, install it locally using npm:

```pwsh
cd ./store-app
npm install
npm start
Open your browser on http://localhost:2500/
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/store-app` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
