# JS Backend

A backend course to become a Full Stack Developer with professional and industry-level approaches.

## Key Concepts

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