const { createUser, createProduct, createOrder} = require('./')
const client = require("./client")

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
        password VARCHAR(255) NOT NULL
        )`) 
    await client.query(`
      CREATE TABLE products(
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         description TEXT NOT NULL,
         price MONEY,
         size VARCHAR(255) UNIQUE NOT NULL,
         color VARCHAR(255) UNIQUE NOT NULL,
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
      { username: 'Esiah', password: 'esiah123'},
      { username: 'Sam', password: 'sam123'},
      { username: 'Mason', password: 'mason123'},
    ]
    const users = await Promise.all(usersToCreate.map(createUser))
    console.log(users)
    console.log('--- Users created ---')
  } catch (error){
    console.log('Error @ Function createInitialUser')
    throw error
  }
}

async function createInitialProduct(){
  console.log('Creating Product')
  try{
      const productsToCreate = [
        {name: 'Specialized - Tarmac', 
        description: 'Road', 
        price: 5800, 
        size: 'medium', 
        color: 'White', 
        availability: true,
        image: 'https://assets.specialized.com/i/specialized/90622-51_TARMAC-SL7-COMP-METWHTSIL-SMK_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto'}
        ,
        {name: 'Black Cat Bicycle - Hello Monsta', 
        description: 'Off-Road', 
        price: 4600, 
        size: 'Small', 
        color: 'Red', 
        availability: true,
        image:'https://bikepacking.com/wp-content/uploads/2020/05/black-cat-hello-monsta-6-2000x1333.jpg'
      }
      ]
    const products = await Promise.all(productsToCreate.map(createProduct))  
    console.log(products)
    console.log('--- product created ---')
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
    const users = await Promise.all(orderToCreate.map(createOrder))
    console.log(users)
    console.log('--- Order created ---')
  } catch (error){
    console.log('Error @ Function createInitialOrder')
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
    await createInitialOrders()
      }
catch(error){
    console.log("---error rebuildDb---")
throw(error)
      }
  }

module.exports = {
  rebuildDB
 }
    