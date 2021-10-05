async function updateProducts(id, fields = {}) {
    const setString = Object.keys(fields).map (
        (key, index) => `
    "${ key }" = ${ index + 1 }`).join (', ')

    if (setString.length === 0) {
        return
    }
    try{
        const {rows: [product]} = await client.query(`
        UPDATE products
        SET ${ setString}
        WHERE id= ${id}
        RETURNING *
        `, Object.values(fields))

        console.log(rows)
        return product
        
    } catch(error) {
        console.log('ERROR @ updateProducts FUNCTION')
        throw error
    }
}