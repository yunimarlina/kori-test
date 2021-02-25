
const { verifyToken } = require("../helpers/jwt")
const db = require('../config/mongo')
const user = db.collection('user')
const {ObjectId} = require('mongodb')

module.exports = async (req,res,next) => {
  try {
    
    const access_token = req.headers.access_token
    if(!access_token){
      res.status(401).json({message: `Login First`})
    }
    else{
      const decoded = verifyToken(access_token)
      let id = decoded.id
      console.log(id + "<<<<<")
      req.loginUser = decoded
      
      let data = await user.findOne({_id: ObjectId(id)})
      if (data) {
        next()
      }
      else {
        res.status(401).send({ message: `Account not found`})
      }
    }

  }
  catch(error){
      res.send(error)

  }
  
}