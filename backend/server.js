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
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true });
const connection= mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb Connected!....")
})
const usersregRouter = require('./router/usersreg');
const shopsregRouter = require('./router/profreg');
const samsRouter = require('./router/Sams');
const adminRouter = require('./router/Admin');
const malediscountsRouter = require('./router/profhousekeeping');
const femalediscountsRouter = require('./router/profchef');
const mapRouter = require('./router/Maps');
const Book_hk = require('./router/Book_hk');
const bookchef = require('./router/bookchef');
app.use('/usersreg',usersregRouter);
app.use('/profreg',shopsregRouter);
app.use('/samsreg',samsRouter);
app.use('/profhousekeeping',malediscountsRouter);
app.use('/profchef',femalediscountsRouter);
app.use('/mapu',mapRouter);
app.use('/admin',adminRouter);
app.use('/book_hk',Book_hk);
app.use('/bookchef',bookchef);
app.listen(port,()=>{ 
    console.log(`Server is connected to the posrt:${port}`);
});
