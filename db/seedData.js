const { createUser, createProduct, createOrder, createOrdersProducts} = require('./')
const { getAllProducts, getProductById, getProductByName} = require('./product')
const {
  getOrdersProductsById,
    getOrdersProductsByOrdersId,
    getOrdersProductsByProductId,
    updateOrdersProducts,
    deleteOrdersProducts} = require('./orders_products')
const client = require("./client");


async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
  try {
    await  client.query(`
      DROP TABLE IF EXISTS orders_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
     `)
    console.log("---tables dropped---")
    } catch (error) {
      throw error; 
    }
  }
  
async function createTables() {
  try {
    console.log("Starting to build tables...")
      // create all tables, in the correct order
  
    await  client.query(`
       CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255)
        )`) 
    await client.query(`
      CREATE TABLE products(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         description TEXT NOT NULL,
         price MONEY,
         size VARCHAR(255) NOT NULL,
         color VARCHAR(255) NOT NULL,
         availability BOOLEAN DEFAULT TRUE,
         image TEXT
           )`)
    await client.query(`
      CREATE TABLE orders(
         id SERIAL PRIMARY KEY,
         "usersId" INTEGER REFERENCES users(id),
         status BOOLEAN DEFAULT false
         )`)
    await client.query(`
        CREATE TABLE orders_products(
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES orders(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER
        )`)   
            
      console.log("---tables built---")
    } catch (error) {
        throw error;
      }
  }

async function createInitialUsers() {
  console.log('Creating users')
  try{
 
    const usersToCreate = [
      { username: 'Esiah', password: 'esiah123', email: 'esiah@test.com'},
      { username: 'Sam', password: 'sam123', email: 'sam@test.com'},
      { username: 'Mason', password: 'mason123', email: 'mason@test.com'},
    ]
    const users = await Promise.all(usersToCreate.map(createUser))
    console.log(users,'--- Users created ---')

  } catch (error){
    console.log('Error @ Function createInitialUser')
    throw error
  }
}

async function createInitialProduct(){
  console.log('Creating Product')
  try{
      const productsToCreate =[
        {name: 'Specialized - Tarmac', 
        description: 'Road', 
        price: 5000, 
        size: 'Medium', 
        color: 'White', 
        availability: true,
        image: 'https://assets.specialized.com/i/specialized/90622-51_TARMAC-SL7-COMP-METWHTSIL-SMK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto'
      },
        {name: 'Black Cat Bicycle - Hello Monsta', 
        description: 'Off-Road', 
        price: 4600, 
        size: 'Small', 
        color: 'Red', 
        availability: true,
        image:'https://bikepacking.com/wp-content/uploads/2020/05/black-cat-hello-monsta-6-2000x1333.jpg'
      }]
    const products = await Promise.all(productsToCreate.map(createProduct))  
    console.log(products,'--- product created ---')
   console.log('---------------------------')
  const test = await getAllProducts
  console.log(test ,' ???????')

  const newTest2 = getProductById(2)
  console.log(newTest2,' ANOTHER ONE??')

  const newTest = getProductByName('Black Cat Bicycle - Hello Monsta')
  console.log(newTest, '??????')
  } catch (error){
    console.log('ERROR @ createInitialProduct')
    throw error
  }
}

async function createInitialOrders() {
  console.log('Creating orders')
  try{
 
    const orderToCreate = [
      { usersId: 1, status: false},
      { usersId: 2, status: false}
    ]
    const orders = await Promise.all(orderToCreate.map(createOrder))
    console.log(orders,'--- Order created ---')

  } catch (error){
    console.log('Error @ Function createInitialOrder')
    throw error
  }
}

async function createInitialOrdersProducts(){
console.log('Creating orders_products') 
  try{
const OP = [
  { orderId: 1, productId: 1, quantity: 1},
  { orderId: 2, productId: 2, quantity: 2}
]
const OSPS = await Promise.all(OP.map(createOrdersProducts))
console.log(OSPS, '--- Orders_Products created ---')

// const test = await getOrdersProductsById(1)
// console.log(test)
// const test2 = await getOrdersProductsByOrdersId(1)
// console.log(test2, '-------------------TEST2')

// const test3 = await getOrdersProductsByProductId(1)
// console.log(test3,' ---------------TEST 3')

//  const test4 = await updateOrdersProducts(1,{
//    orderId: 1, productId: 1, quantity: 3
//  })
//  console.log(test4, ' ------------UPDATE TEST')


  }catch (error) {
    console.log('ERROR @ createInitialOrdersProducts')
    throw error
  }
}

async function rebuildDB(){
  try{
    client.connect()
    await dropTables()
    await createTables()
    await createInitialUsers(),
    await createInitialProduct(),
    await createInitialOrders(),
    await createInitialOrdersProducts()
      }
catch(error){
    console.log("---error rebuildDb---")
throw(error)
      }
  }

module.exports = {
  rebuildDB
 }
    