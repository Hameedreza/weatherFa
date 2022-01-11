const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const path = require('path');


const publicPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname , 'views');
console.log(viewPath);

const app = express();


app.use(express.static(publicPath));
app.set('view engine' , 'hbs');
app.set('views' , viewPath);



app.get('/' , (req , res)=>{
  res.render('index');
})






app.listen(3000 , ()=>{
  console.log('Server is up on port 3000');
})