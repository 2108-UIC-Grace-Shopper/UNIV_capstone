const client = require('./client')

async function createUser({ username, password,email}) {
    try {
      const {rows: [user]} = await client.query(`
        INSERT INTO users(
            username, 
            password,
            email) 
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING 
        RETURNING id, username, email
      `, [username, password, email]);
      return user
    } catch (error) {
      console.log('ERROR @ createUser FUNCTION')
      throw error;
    }
  }

async function getUser({username, password}) {
 if (!username || !password){
     return
 }
    try{
       const user = await getUserByUsername(username)
       console.log("dbuser: ",user)
       if(!user) {
           return
       }
       if(user.password != password) {
           return
       }
       delete user.password
      return user  
    } catch (error){
        console.log('ERROR @ getUser FUNCTION')
        throw error
    }   
}

async function getUserById(userId) {
    try{
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE id = $1
        `,[userId])

        if (!user) {
            return null
        }
        delete user.password
        return user
    } catch (error) {
        console.log('ERROR @ getUserByUsername FUNCTION')
        throw error
    }
}

async function getUserByUsername(username) {
    try{
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username = $1
        `, [username])

        if (!user) {
            return null
        }
        // delete user.password
        return user
    } catch (error) {
        console.log('ERROR @ getUserByUsername FUNCTION')
        throw error
    }
}

  module.exports = {
      createUser,
      getUser,
      getUserById,
      getUserByUsername
  }