const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app =express();
const port = process.env.PORT || 5000;
app.use(cors());
//app.use(express.json());
//app.use(require('connect').bodyParser);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
//app.use(app.router);
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb Connected!....")
})
const usersregRouter = require('./router/usersreg');
const shopsregRouter = require('./router/shopsreg');
const samsRouter = require('./router/Sams');
const dasRouter = require('./router/Das');
const malediscountsRouter = require('./router/Malediscounts');
const femalediscountsRouter = require('./router/Femalediscounts');
const mapRouter = require('./router/Maps');
app.use('/usersreg',usersregRouter);
app.use('/shopsreg',shopsregRouter);
app.use('/samsreg',samsRouter);
app.use('/dasreg',dasRouter);
app.use('/maledis',malediscountsRouter);
app.use('/femaledis',femalediscountsRouter);
app.use('/mapu',mapRouter);
app.listen(port,()=>{ 
    console.log(`Server is connected to the posrt:${port}`);
});