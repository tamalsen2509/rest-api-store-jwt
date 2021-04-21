# rest-api-store-jwt

Guide to use 


endpoints:
---------------------------------------------To create user and generate JWT--------------------------------------------------

'/api/v1/user/create', method=post , payload={name,email,password,role="user or admin"};Output=type=json,Action=creat a new user.
'/api/v1/user/jwt/:uuid' method=get;Output=type=json,Action=Generate a json web token.


-----------------------------------------------Section to create new product or other crud functionality-------------------------

'/api/v1/product/create/:uuid'+jwt , method=post, paylod={name,price},Output=type=json,Action=New product created. 
'/api/v1/product/edit/:userId/:productId'+jwt , method=put, paylod={name,price},Output=type=json,Action= product update successfull.
'/api/v1/product/erase/:userId/:productId'+jwt , method=delete,Output=type=json,Action= product deleted successfully.


-----------------------------------------------Section to view all products and view single product by productid------------------

'/api/v1/product/all/:userId'+jwt , method=get,Output=type=json,Action=list of all products.
'/api/v1/product/one/:userId/:productid'+jwt , method=get,Output=type=json,Action=list one product.


## HOW TO INSTALL 

Download the source code file 

type npm install to install all the dependencies

type npm run dev to run server on development mode on port 3000

open http://localhost:3000 link on postman
