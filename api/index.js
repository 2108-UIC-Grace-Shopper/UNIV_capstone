const express = require('express')
const apiRouter = express.Router()
const {getUserById}=require('../db')
const {client} = require('../db/client')

apiRouter.get("/health", (req,res,next)=>{
    res.send ({message:"everything is awesome"})
})

// apiRouter.use(async (req, res, next) => {
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');
    
//     if (!auth) { // nothing to see here
//       next();
//     } else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);
      
//       try {
//         const parsedToken = jwt.verify(token, JWT_SECRET);
        
//         const id = parsedToken && parsedToken.id
//         if (id) {
//           req.user = await getUserById(id);
//           next();
//         }
//       } catch (error) {
//         next(error);
//       }
//     } else {
//       next({
//         name: 'AuthorizationHeaderError',
//         message: `Authorization token must start with ${ prefix }`
//       });
//     }
//   });

//   apiRouter.use((req, res, next) => {
//     if (req.user) {
//       console.log("User is set:", req.user);
//     }
//     next();
//   });





module.exports =apiRouter