const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config()
// product here
const Product = require('./models/product');

mongoose.connect(process.env.DB)
.then(()=>{
  console.log('DB Connection Opeen!')
  console.log(process.env.DB)
})
.catch(err => {
  console.log('ERRRRRRRROOOOOOOOORRRRRR!')
  console.log(err)
})

app.set('views',path.join('views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
  res.render('products/homepage')
})

app.get('/products/new', (req,res)=>{
  res.render('products/new', {categories})
})

app.get('/products', async (req,res)=>{
  const {category} = req.query;
  if(category){
    const products = await Product.find({category})
    res.render('products/index',{products,category})
  }else{
    const products = await Product.find({})
    res.render('products/index',{products, category:'All'})
  }
  // console.log(products)
  // res.send('All products will be here')
})

app.post('/products', async (req,res)=>{
  const newProduct = new Product(req.body);
  await newProduct.save();
  // console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
})



app.get('/products/:id/edit', async (req,res)=>{
  const {id} = req.params
  const product = await Product.findById(id)
  res.render('products/edit', {product,categories})
})

categories = ['fruit', 'vegetable', 'dairy']

app.put('/products/:id', async(req,res)=>{
  const {id} = req.params
  const product = await Product.findByIdAndUpdate(id,req.body, {runValidators: true,new: true})
  // console.log(req.body)
  res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async(req,res)=>{
  const {id} = req.params
  const deletedProduct = await Product.findByIdAndDelete(id)
  // console.log(deletedProduct)
  res.redirect('/products/')
})

app.get('/products/:id', async(req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id)
  // console.log(product)
  // res.send('details page!')
  res.render('products/show', {product, categories})
})




app.listen(3000,()=>{
  console.log('app working on port 3000')
});

