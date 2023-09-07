const mongoose = require('mongoose');
// product here
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
.then(()=>{
  console.log('DB Connection Opeen!')
})
.catch(err => {
  console.log('ERRRRRRRROOOOOOOOORRRRRR!')
  console.log(err)
})

// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 2.99,
//   category: 'fruit'
// })

// p.save().then(p=>{
//   console.log(p)
// })
// .catch(e =>{
//   console.log(e)
// })

const seedProducts = [
  {
    name: 'Eggplant',
    price: 1.00,
    category: 'vegetable'
  },
  {
    name: 'Ruby Grapefruit',
    price: 2.99,
    category: 'fruit'
  },
  {
    name: 'Watermelon',
    price: 0.99,
    category: 'fruit'
  },
  {
    name: 'Egg',
    price: 0.50,
    category: 'dairy'
  },
  {
    name: 'Organic Celery',
    price: 1.99,
    category: 'vegetable'
  },
  {
    name: 'Orange',
    price: 1.29,
    category: 'fruit'
  },
  {
    name: 'Chocolate Milk',
    price: 2.69,
    category: 'dairy'
  }
]

Product.insertMany(seedProducts)
.then(res =>{
  console.log(res)
})
.catch(err =>{
  console.log(err)
})