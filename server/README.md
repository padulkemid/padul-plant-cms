# PadulJualan Server Setup 👍🏼🤸🏽‍♂️


## Features ✨✨✨

### Main Configurations

   - Servers created using Express.js
   - PostgreSQL database built with Sequelize ORM
   - Simple Routes and Error Handling

### Deploy Link

  - https://paduljualan.herokuapp.com

## RESTful API 🤩

### ADMIN ONLY 👾🚀

---

#### GET 💵

  - **BASE**/_users_

      - _Response_ :
          ```javascript
          {
            message: 'Successfully getting all users!',
            users: [<array_of_objects>]
          }
          ```

      - _Errors_ :
        ```javascript
          // Forbidden 403 ( Not an Admin || Authentication )

        {
          message: "Token not found! // You're not an Admin!"
        }
        ```

  - **BASE**/_items_

      - _Response_ :
          ```javascript
          {
            message: 'Successfully getting all products!',
            items: [<array_of_objects>]
          }
          ```

      - _Errors_ :
        ```javascript
          // Forbidden 403 ( Not an Admin || Authentication )

        {
          message: "Token not found! // You're not an Admin!"
        }
        ```

  - **BASE**/_items/:id_

      - _Response_ :
          ```javascript
          {
            message: 'Successfully getting product with id <id>',
            item: <object_of_item>
          }
          ```

      - _Errors_ :
        ```javascript
          // Forbidden 403 ( Not an Admin || Authentication )

        {
          message: "Token not found! // You're not an Admin!"
        }

          // Not Found 404 
        
        {
          message: "Item not found!"
        }
        ```

#### POST 📝

  - **BASE**/_register_

      - _Request_ :
          ```javascript
          {
            email: <string_of_email>,
            username: <string_of_username>,
            password: <string_of_password>,
            role: <string_of_role> // Available: Admin or User
          }
          ```

      - _Response_ :
          ```javascript
          {
            message: 'Successfully registered new user!',
            success: 1
          }
          ```

      - _Errors_ :
        ```javascript
          // Bad Request 400 (Validation)

        {
          message: <validation_message_based_on_request_properties>
        }
        ```

  - **BASE**/_login_
    
      - _Request_ :
          ```javascript
          {
            username: <string_of_username>,
            password: <string_of_password>,
          }
          ```

      - _Response_ :
          ```javascript
          {
            message: 'Successfully logged in!',
            token: <string_of_token>,
            isAdmin: true // indicated user is an Admin else it can't login
          }
          ```

      - _Errors_ :
        ```javascript
          // Bad Request 400 (Validation)

        {
          message: <validation_message_based_on_request_properties>
        }

          // Forbidden 403 (Wrong Token || Authorization)

        {
          message: "Token not found! // You're not an Admin"
        }
        ```
  
  - **BASE**/_items_

      - _Request_ :
          ```javascript
          {
            name: <string_of_name>,
            image_url: <string_of_url>,
            price: <integer_of_price>,
            stock: <integer_of_stock>
          }
          ```

      - _Response_ :
          ```javascript
          {
            message: 'Successfully created new item!',
            success: 1
          }
          ```

      - _Errors_ :
        ```javascript
          // Bad Request 400 (Validation)

        {
          message: <validation_message_based_on_request_properties>
        }

          // Forbidden 403 (Wrong Token || Authorization)

        {
          message: "Token not found! // You're not an Admin"
        }
        ```

#### PUT 🤲🏼

  - **BASE**/_items/:id_
    
      - _Request_ :
          ```javascript
          {
            name: <string_of_name>,
            image_url: <string_of_url>,
            price: <integer_of_price>,
            stock: <integer_of_stock>
          }
          ```

      - _Response_ :
          ```javascript
          {
            message: 'Successfully edited the item with id <id>',
            success: 1
          }
          ```

      - _Errors_ :
        ```javascript
          // Bad Request 400 (Validation)

        {
          message: <validation_message_based_on_request_properties>
        }

          // Forbidden 403 (Wrong Token || Authorization)

        {
          message: "Token not found! // You're not an Admin"
        }

          // Data not Found 404 

        {
          message: 'Item not found!'
        }
        ```

#### DELETE ❌

  - **BASE**/_items/:id_

      - _Response_ :
          ```javascript
          {
            message: 'Successfully deleted user with id <id>',
            success: 1
          }
          ```

      - _Errors_ :
        ```javascript
          // Forbidden 403 (Wrong Token || Authorization)

        {
          message: "Token not found! // You're not an Admin"
        }

          // Data not Found 404 

        {
          message: 'Item not found!'
        }
        ```

