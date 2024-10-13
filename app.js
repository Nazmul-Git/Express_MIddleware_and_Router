const express = require('express');
const app = express();

// sub-app-route
const adminRouter = express.Router();
app.use('/admin', adminRouter);





// middleware in route
const loggerWrapper = (option) => {
    return (req, res, next) => {
        if (option.log) {
            console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);

            next();
        } else {
            throw new Error('Faild to log!')
        }
    }
}

adminRouter.use(loggerWrapper({ log: true })); //only adminRoutera a logger middleware ta pabo
// app.use(logger); // full application a logger middleware ta pabo


// ---------------all routes here--------------

app.get('/', (req, res) => {
    res.send('Home');
});

adminRouter.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

// users
app.get('/users', (req, res) => {
    res.send('All users');
});


// error handling middleware
const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('There was server error!');
}
adminRouter.use(errorHandleMiddleware);




app.listen(3000, () => {
    console.log('Application running on port 3000');
})