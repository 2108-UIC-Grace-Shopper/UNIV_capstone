const client = require('./client')

async function createOrder({usersId, status}){
    try{
        const {rows: [order]} = await client.query(`
        INSERT INTO orders("usersId", status)
        VALUES ($1,$2)
        RETURNING *    
        `,[usersId, status])

        return order
    } catch(error){
        console.log('ERROR @ createOrder FUNCTION')
        throw error
    }
}
async function getOrderById(id){
    try{
        const {rows: [order]} = await client.query(`
        SELECT * FROM orders
        WHERE id = $1
        `, [id])
        return order

    } catch(error){
        console.log('ERROR getOrderByID FUNCTION')
        throw error
    } 
}

async function getAllOrders(){
    try{
        const {rows: orders} = await client.query(`
        SELECT * FROM orders
        JOIN users ON orders."userId" = users.id`)
        return orders
    } catch(error){
        console.log('ERROR @ getAllOrders FUNCTION')
        throw error
    }
}


module.exports = {
    createOrder,
    getOrderById,
    getAllOrders
}




