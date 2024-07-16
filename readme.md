# JS Backend

A backend course to become a Full Stack Developer with professional and industry level approaches.

DB is always in another continent:
  This phrase implies
  1) DB will mostly be very far away from the server
      - takes time to fetch the data
      ```JavaScript
      async() await // will be used
      ```
  2) There will be chances of connection lost or any error
      ```JavaScript
      try{} catch(){}
      ```

ConnectDB might return a promise
so use .then and .catch

we will use app.use() mostly either for middleware or for configurations 