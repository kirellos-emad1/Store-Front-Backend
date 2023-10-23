# Storefront Backend Project

## Author 
Kirellos Emad

## About
This is the storefront Backend Project for Udacity Course.
it was required to create API that holds all the data in database.

## How you can use it

### Setup PostgreSql databases 
1- you need to enter psql postgresql environment using command:
```
psql -U username postgresql
```
and enter the password related to username.

Note that the postgresql port used is: ```5432```.

2- Create 2 databases using psql postgresql, one database for real developments process and the other is for testing, you can create the database in postgresql command environment using the command:
```
CREATE DATABASE dev_database;
CREATE DATABASE test_database;
```
here we used 'dev_database' as the name for development database, and 'test_database' fot testing database.

3- Connect to the desired database, in case of testing you may want to connect to testing database by using command:
```
\c test_database
```

4- To exit from postgres environment and return to normal bash command
```
\q
```

### Setup node environment
1- you need to install npm packages in order to e able to use this API, run the command
```
npm install
```
you will notice a folder called 'node_modules' has appeared, and all packages has been installed.

2- You have to create .env file, containing all the required parameters to create connection to postgresql database (check database.ts file to know the parameters).
this is an example of what should the .env file looks like

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB_TEST=database_test
ENV=dev
BCRYPT_PASSWORD=any-password
SALT_ROUND=10
TOKEN_SECRET=anysecret
```



3- Then you will need to migrate the table to the database, you can use the command:
```typescript
db-migrate up:
```
This will add a clear tables in the normal database.

### Using the server and endpoints
first you will need to run the server using:
``` TypeScript
npm run watch
```
note that the server runs on port: ```5000``` on localhost, so to try it goto
```
http://localhost:5000
```

#### 1- Users endpoint
a. POST '/users' this will enables you to create new user, and it will return a token, that you will use in certain endpoints.
you must enter the "firstname", "lastname", and "hashpwd" to successfully create the user.

b. GET '/users' this will return all the users in database (you will need to enter token).

c. GET '/users/:id' this will return a user using its id (you will need to enter token).
example: '/users/2'

#### 2- Products endpoint
a. GET '/products' this will return all the products in database.

b. GET '/products:/id' this will return a product using its id.
example: '/products/2'

c. POST '/products' this will enables you to create new product (you will need to enter token).
you must enter the "name", "price" to successfully create the product.

#### 3- Orders endpoint
b. GET '/orders/userorders complete' this will show all the COMPLETED orders that relate to certain user, using the user id (you will need to enter token).
example: '/orders/userorders', will return all the orders for user that have id of the user and the order status is 'complete'.

a. POST '/orders/:id' this will show all the orders that relate to certain user, using the user id (you will need to enter token).
example: '/orders/2', will return all the orders for user that have id of 2.

c. POST '/orders/:id/addproduct' this will enables you to add product to your order, knowing that parameters id is relevant to order id (you will need to enter token).
you must enter the "quantity" and "productID" to successfully add the product.
example: '/orders/2/addproduct', will allow you to add product to order having order_id of 2.


## Testing
### Jasmine Test
For testing there are a complete folder for migration that contains all the tables in addition to some rows, for testing purposes.
To test the API, just run the command
To run the tests the endpoints and the models should run separately by editing the jasmine.json file from 
"spec_files": ["../Models/tests/*[sS]pec.js"] to   "spec_files": ["../Handlers/tests/*[sS]pec.js"]. 
```
npm run test
```
this will do the following in order:
1- Build the files and convert from typescript to javascript.
2- Make the ENV variable equal to 'test' so the migration database will remain safe.
3- Jasmine test will run.
4- If jasmine tests were successfully done, a migration reset will be done to the testing database.
