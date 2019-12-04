# PhotoGallery API

_Developed in NodeJs with the framework Express,
All data  is stored in a NoSql database (MongoDB)_

## Configuration and Deployment 🚀

_
1.	Clone the project
2.	Download all  dependencies using  the command npm install
3.	execute the Project using the command node index.js  ori f you downloades nodemon, you can use the npm start command
4.	This server run  on port 3020, you can change the port in the app.js file_



### Controller 🔧

_We have 4 Controllers, 3 of the business logic and 1 for the server connection test_

_1.	WelcomeController_

```
-home (/) - Api is running
```

_2.	UserController_

```
-Post (/User/singUp) -: Register a user
-Post (/User/logIn) -: Log in
-Post (/User/getUser) -: Obtain information from a user by their id

```


_3.	PhotoController_

```
-Get (/Photo) -: Get all the photos of a user    
-Get (/Photo/GetFilters) -: Get all photos of a user by name
-Post (/Photo) -. Route post: Upload photos   
-Delete (/Photo) -: Delete a user's photo

```



## Built with 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [NodeJs](https://nodejs.org/es) 
* [Exressjs](http://expressjs.com) 
* [Mongoose](https://mongoosejs.com)
* [Cors](https://www.npmjs.com/package/cors)
---

⌨️ (https://github.com/cristianvp03) :D