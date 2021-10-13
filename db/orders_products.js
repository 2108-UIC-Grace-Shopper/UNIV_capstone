const client = require('./client')

async function createOrdersProducts({orderId, productId, quantity}) {
    try{
        const {rows: [OP]} = await client.query(`
        INSERT INTO orders_products("orderId", "productId", quantity)
        VALUES($1,$2,$3)
        RETURNING *
        `,[orderId, productId, quantity])
        return OP

    } catch (error) {
        console.log('ERROR @ createOrdersProducts')
        throw error
    }
}

async function getOrdersProductsById(id){
    try{
        const {rows: [OP]} = await client.query(`
        SELECT * FROM orders_products
        WHERE id = $1
        `,[id])

        return OP
    } catch(error){
        console.log('ERROR @ getOrdersProductsById')
        throw error
    }
}

async function getOrdersProductsByOrdersId(id){
    try{
        const {rows: OP} = await client.query(`
        SELECT * FROM orders_products
        WHERE "orderId" = $1
        `,[id])
        return OP
    } catch(error){
        console.log('ERROR @ getProductsByOrdersId FUNCTION')
        throw error
    }
}

async function getOrdersProductsByProductId({id}){
    try{
        const {rows} = await client.query(`
        SELECT * FROM orders_products
        WHERE "productId" = ${id}`)
        return rows
    } catch(error){
        console.log('ERROR @ getProductsByProductId FUNCTION')
        throw error
    }
}
async function updateOrdersProducts(id, fields = {}) {
    const setString = Object.keys(fields).map (
        (key, index) => `
    "${ key }" = ${ index + 1 }`).join (', ')

    if (setString.length === 0) {
        return
    }
    try{
        const {rows: [OP]} = await client.query(`
        UPDATE orders_products
        SET ${ setString}
        WHERE id= ${id}
        RETURNING *
        `, Object.values(fields))
        return OP
    } catch(error) {
        console.log('ERROR @ updateOrdersProducts FUNCTION')
        throw error
    }
}
async function deleteOrdersProducts(id){
    try{
        const {rows: [ordersProducts]} = await client.query(`
        DELETE FROM orders_products
        WHERE id = $1
        RETURNING *
        `, [id])

        return ordersProducts
    } catch(error){
        console.log('ERROR @ deleteOrdersProduct')
        throw error
    }
}

module.exports = {
    createOrdersProducts,
    getOrdersProductsById,
    getOrdersProductsByOrdersId,
    getOrdersProductsByProductId,
    updateOrdersProducts,
    deleteOrdersProducts
}