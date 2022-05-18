# e-commerce-marketplace

## Getting Started
For setting up the development environment, follow the steps given below.

1. Clone this repository in your local
```sh
 git clone git@github.com:sureshkumarAQ/e-commerce-marketplace.git
```
2. Install the required packages
```sh
 npm i
```
3. Create a config.env file in main folder
   - Make a variable name PORT and assign the value 3000 or 8000
   - Make another variable name MONGO_URI for mongodb atlas connection string 
   - And a JWT_SECRET which is helpful for creating jsonwebtoken 
4. Finally start the server 
   ```sh
   npm start
   ```
5. Now open postman and test APIs
# For testing APIs follow thses instructions:
```sh
http://localhost:3000/api/seller/create-catalog
``` 
for above API POSTMAN body should be like this
![Screenshot (433)](https://user-images.githubusercontent.com/69745908/169004981-1c3f1727-e6bc-4061-9086-1f219708b272.png)

and 
```sh
http://localhost:3000/api/buyer/create-order/628479c97ef501f4d246511c
```
for this API body should be like this
![Screenshot (434)](https://user-images.githubusercontent.com/69745908/169005152-1d5e1524-b93d-44cd-99bd-ad362c343062.png)

