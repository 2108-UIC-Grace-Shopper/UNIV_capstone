const client = require('./client')

async function createProduct({name, description, price, size, color, availability, image}) {
    try{
        const {rows: [product]} = await client.query(`
        INSERT INTO products (
            name, 
            description, 
            price, 
            size, 
            color, 
            availability,
            image)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT (name) DO NOTHING
        RETURNING name, description, price, size, color, availability, image  
        `,[name, description, price, size, color, availability, image])
    
      return  product     
    } catch(error) {
        console.log('ERROR @ createProduct FUNCTION')
        throw error
    }
}



async function getAllProducts(){
    try{
        const {rows} = await client.query(`
        SELECT * FROM products
        `)
  return rows
    } catch(error){
        console.log('ERROR @ getAllProduct FUNCTION')
        throw error
    }
}

async function getProductById(id) {
    try{
        const {rows: [product]} = await client.query(`
        SELECT * FROM products
        WHERE id = $1
        `, [id])
        return product 
    } catch(error) {
        console.log('ERROR @ getProductsById FUNCTION')
        throw error
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById
}