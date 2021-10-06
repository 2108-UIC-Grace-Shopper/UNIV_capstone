const client = require('./client')

async function createOrder({usersId, status}){
    try{
        const {rows: [order]} = await client.query(`
        INSERT INTO orders(
            "usersId",
            status)
        VALUES ($1,$2)
        RETURNING *    
        `,[usersId, status])

        return order
    } catch(error){
        console.log('ERROR @ createOrder FUNCTION')
        throw error
    }
}

async function getAllOrders(){
    try{
        const {rows: orders} = await client.query(`
        SELECT * FROM orders
        JOIN users ON orders."userId" = users.id`)

    } catch(error){
        console.log('ERROR @ getAllOrders FUNCTION')
        throw error
    }
}


module.exports = {
    createOrder
}




// async function updateProducts(id, fields = {}) {
//     const setString = Object.keys(fields).map (
//         (key, index) => `
//     "${ key }" = ${ index + 1 }`).join (', ')

//     if (setString.length === 0) {
//         return
//     }
//     try{
//         const {rows: [product]} = await client.query(`
//         UPDATE products
//         SET ${ setString}
//         WHERE id= ${id}
//         RETURNING *
//         `, Object.values(fields))

//         console.log(rows)
//         return product
        
//     } catch(error) {
//         console.log('ERROR @ updateProducts FUNCTION')
//         throw error
//     }
// }