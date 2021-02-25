const db = require('../config/mongo')
const user = db.collection('user')
const history = db.collection('history')
const {ObjectId} = require('mongodb')

class User{
  static register (payload){
    return user.insertOne(payload)
  }
  static login(loginData){
    return user.findOne({email: loginData.email})
  }
  static getAllUsers(){
    return user.find().toArray()
  }
  static detailUser(id){
    return user.findOne({_id: ObjectId(id)})
  }
  static getActiveUsers(){
    return user.find({"token": {$ne:null}}).toArray()
  }
  static edit(id,payload){
    return user.findOneAndUpdate({ "_id": ObjectId(id) }, payload, { returnOriginal: false })
    .then(data => data.value)
  }
  static getAllHistory(){
    return history.find().toArray()
  }
  static detailHistory(id){
    return history.findOne({_id: ObjectId(id)})
  }

}
module.exports = User