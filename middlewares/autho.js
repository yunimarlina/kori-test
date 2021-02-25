
const { verifyToken } = require("../helper/jwt")
const db = require('../config/mongo')
const user = db.collection('user')
const {ObjectId} = require('mongodb')

module.exports = async (req,res,next) => {
  try {
   
    const loggedUserId = req.loginUser.id
      let data = await user.findOne({_id: ObjectId(loggedUserId)})
      if (data) {
        next()
      }
      else {
        res.status(401).send({  message: `You Dont Have Permission to Do this Action`})      
      }
    
  }
  catch(error){
    console.log(error)
    next(error)

  }

}