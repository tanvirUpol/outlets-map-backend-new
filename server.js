require('dotenv').config()
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose')
// routes
const userRoutes = require('./routes/user')

const outletRoutes = require('./routes/outlets');

const catWiseRoutes = require('./routes/catwiseRoutes');



//express app
const app = express()


// middleware
app.use(express.json({limit: '100mb'}));
app.use(cors());

app.use((req,res,next)=>{
    // console.log(req.body);
    console.log(req.path,req.method);
    next()
})

// ROUTES
app.use('/api/user',userRoutes)

app.use('/api/outlets',outletRoutes)

app.use('/api/cat',catWiseRoutes)






// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log(`connected to db and listening on port ${process.env.PORT}!`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })

