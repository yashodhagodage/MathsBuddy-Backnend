const express = require('express'); 
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const cors = require('cors');
const questionRouter = require('./routes/question-routes');
const userRouter = require('./routes/user-routes');
const historyRouter = require('./routes/history-route');
const favoriteRouter = require('./routes/favorite-rotes');
const materialRouter = require('./routes/material-route');
const adminRouter = require('./routes/admin-routes');
const categoryRouter = require('./routes/category-routes');
const employeeRouter = require('./routes/employee-routes');
//const authRoute = require('./routes/auth');


dontenv.config()
const app = express();

//srtup the server port
const port = process.env.PORT || 5000;


//Middlewares
app.use(express.json());
app.use(cors())

 //define the route for "/"
app.get("/", function (request, response){
//show this file when the "/" is requested
response.sendFile(__dirname+"/views/index.html");
});

//routes are defined in the -> routes/question-routes.js
app.use('/question',questionRouter)

//routes are defined in the -> routes/user-routes.js
app.use('/user',userRouter)


//routes are defined in the -> routes/history-route.js
app.use('/history',historyRouter)

//routes are defined in the -> routes/favorite-route.js
app.use('/favorite',favoriteRouter)

//routes are defined in the -> routes/material-route.js
app.use('/material',materialRouter)

//routes are defined in the -> routes/admin-routes.js
app.use('/admin',adminRouter)

//routes are defined in the -> routes/category-routes.js
app.use('/category',categoryRouter)

//routes are defined in the -> routes/employee-routes.js
app.use('/employee',employeeRouter)

//auth routes are defined in the -> routes/auth.js
//app.use('/api/user',authRoute)


mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Connected to MongoDb successfully"))
.then(() =>{
    app.listen(port);
}).then(() => console.log(`App Started on port ${port}`))
.catch(err => console.log(err));
