# JS Backend

A backend course to become a Full Stack Developer with professional and industry-level approaches.

## Key Concepts

### ALWAYS make sure to exclude **.env** from bieng pushed to the public repo or any other sensitive place 
- use .gitignore for it

### DB is Always in Another Continent

This phrase implies two main considerations:

1. **DB will mostly be very far away from the server**:
   - Fetching data from a distant database can take time.
   - Asynchronous operations will be used to handle data fetching efficiently.
     ```javascript
     async function fetchData() {
       await someAsyncOperation();
     }
     ```

2. **There will be chances of connection loss or any error**:
   - Errors and connection issues are common when dealing with remote databases.
   - Error handling mechanisms like `try-catch` will be used to manage such situations.
     ```javascript
     async function fetchData() {
       try {
         await someAsyncOperation();
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     }
     ```

### ConnectDB Might Return a Promise

- The `connectDB` function may return a promise.
- Use `.then` and `.catch` for handling the promise.
  ```javascript
  connectDB()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
  ```

### we will use **`app.use()`** mostly either for middleware or for configurations

### MongoDB stores all of its data in BSON format
- **Binary JSON** is just an extension of ***JSON***
- supports more **Data Types** int, long, date, binary, etc

-  designed to be **efficient** in both storage space and scan-speed.

- **Efficient Traversal**: It includes metadata for efficient traversal and extraction, allowing for faster query operations in databases like MongoDB.

### mongoose aggreagate pagination


### bcrypt
Bcrypt helps to hash passwords:

- Easier encryption and decryption: Provides a secure way to store passwords by hashing them.

### JSON Web Token (JWT)
JWT (JSON Web Token) is used for securely transmitting information between parties:
- Payload: fancy name for the data contained within the token.
- Secret: Used to sign and verify the token.
- Bearer Token: `jwt` is a type of token that can be used like a key to access resources.
- Refresh Token: Stored in the database for issuing new access tokens.
- Access Token: Not stored in the database.

```JavaScript
req.body:  [Object: null prototype] {
  fullName: 'one',
  username: 'one',
  email: 'one@mail.com',
  password: '12345678'
}

req.files:  [Object: null prototype] {
  avatar: [
    {
      fieldname: 'avatar',
      originalname: 'pic1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './public/temp',
      filename: 'pic1.jpg',
      path: 'public\\temp\\pic1.jpg',
      size: 123
    }
  ],
  coverImage: [
    {
      fieldname: 'coverImage',
      originalname: 'boy.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './public/temp',
      filename: 'boy.png',
      path: 'public\\temp\\boy.png',
      size: 123
    }
  ]
}
```
