# Warehouse Management System (WMS)
## [Live Server](https://wms-team9-final.onrender.com)

---
## Description:

It's a Billing and Warehouse Management System - Point of Sale management system. It is an advanced billing software and warehouse management tool, which comes with features like managing Products in stock, Transactions, Categories and printing Invoices, it also has an amazing visual analytics using charts and graphs. It can be used for different busniesses like mobile stores, clothing stores,..etc where you want to manage the stock and to buy or sell products.

It is a powerful warehouse management system that allows you to manage your entire business through a single system. This system is designed to help you manage all of your business’s sales and purchase transactions. You can use it to track inventory, send invoices, and more! It’s a complete solution that allows you to manage your business from the comfort of your own desk.

---
## Databae Schema 

![Databae Schema](https://user-images.githubusercontent.com/100903950/199322547-69ebe0ca-4491-464b-8288-593c214e4c38.png)


---
## User Stories:

- You can login as different user roles like admin and user.
- You can add, edit, delete and view categories.
- You can filter categories by name.
- You can add, edit, delete and view products.
- You can filter products by title.
- You can manage purchases/sales operations.
- You can change the sale price of the products.
- You can filter for purchases and sales by the the user who did it.
- You can print detailed invoices of your purchases and sales.
- You can view charts of monthly and anually purchases and sales
- You can view users informations


---
##  How to install the project on the local machine

- First you need to clone the repository by typing in terminal  ```git clone <the link here>``` and then the repo will be cloned to your local machine.
- Now you need to run the command `npm run init` to install all the dependencies for both client and server.
- After that you should setting up the database follow the steps :

    1.  Connect to postgres, by typing `psql` or `pgcli` in the terminal.
    2.  use these commands to create your database
        ```
        CREATE DATABASE db_name;
        CREATE USER user_name WITH SUPERUSER PASSWORD 'password';
        ALTER DATABASE db_name OWNER TO user_name;
        ```
    3.  Add a `.env` you can see ```example.env``` to get idea of what you need to write.
    4. Copy build.sql path ```.../server/database/config/build.sql``` and run this command in terminal ```\i [build.sql path]```.
- To run the server, you can run the `npm run dev` command and to run the client server you need to run `cd client & npm run start`.
- To generate fake data you need first to create a new folder named 'output' in ./src/scripts and then run the command `npm run generate-data`
- To populate the database tables you can run `npm run build-DB`
---
##  Technologies that I used

-  ReactJs
-  ReactStrap
-  Nodejs
-  Express
-  PLpgSQL
-  Sequelize
-  Faker.js
-  JWT


## Our Team Members:

- [Ali Shbair](https://github.com/ShbairAli)
- [Yazeed El-Haj Salem](https://github.com/ysalem-dev-89)
- [Rabee](https://github.com/Rabee96)
- [Sami A Ba‘alousha](https://github.com/sam96B)

## Our Team Leader:

- [Ahmed Safi](https://github.com/AhmedSafi97)
