const convert = require('../helpers/dateFormater')
const {generateHash,verifyHash} = require('../helpers/bycripts')
const {generateToken,verifyToken} =  require('../helpers/jwt')
const User = require('../mongoModels/User')
const {Card} = require('../models')

class Controller{
  static register (req,res,next){
   
    const registeredDate = convert()
    const passwordHash = generateHash(req.body.password)

    let payload = {
      nama: req.body.name,
      email: req.body.email,
      alamat: req.body.alamat,
      password: passwordHash,
      userId: req.body.userId,
      app_pin: req.body.app_pin,
      device: req.body.device,
      card: [],
      registeredDate: registeredDate,
      history: null,
      token: null

    }
    User.register(payload)
      .then((data) => {
        res.json((data).ops[0])
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      })
  }
  static login(req,res){
    const loginData ={
      email: req.body.email,
      password: req.body.password
    }
    
    User.login(loginData)
      .then((data) => {
        if(!data){
          res.status(401).json({message: `Account not Found`})
        }
        else if(verifyHash(req.body.password,data.password)){
          const id = data._id
          const access_token = generateToken({id,email: data.email})
          const payload = {
            $set: {token: access_token}
          }
          User.edit(id,payload)
          res.status(200).json({access_token})
        }
        else{
          res.status(404).json({message: `Data not found`})
        }
      })
      .catch((err) => {
        res.json(err)
      })
  }
  static getAllUsers(req,res){
    User.getAllUsers()
      .then(data =>{
        res.status(200).send(data)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  
  static detailUser(req,res){
    const id = req.params.id
    User.detailUser(id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  static getActiveUsers(req,res){
    User.getActiveUsers()
      .then(data =>{
        res.status(200).send(data)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  static addCard(req,res){
    const id = req.loginUser.id
    const cardNumber = generateHash(req.body.cardNumber)
    const CVV = generateHash(req.body.CVV)
    const cardName = generateHash(req.body.cardName)
    const payload = {
      cardNumber:cardNumber,
      CVV: CVV,
      cardName: cardName,
      Username: req.body.Username,
      CardType: req.body.CardType,
      cardExpDate: req.body.cardExpDate
    }

    Card.create(payload)
    .then (data=>{
      const payload ={
        $push: { card: data.id }
      }
      User.edit(id,payload)
      res.status(201).json(data)
    })
    .catch (err=>{
    })
  }
  static async deleteCard(req,res){
    let id = +req.params.id
    try {
        let data = await Card.destroy({
            where: {id},returning: true
        })
        if(!data){
          res.status(404).json({message: 'Data not found'})
        } else{
          res.status(200).json({message:`Success Deleted`})
        }
    } 
    catch (error) {
      next(error)
    }
  }
  static async editCard(req,res){
    const cardNumber = generateHash(req.body.cardNumber)
    const CVV = generateHash(req.body.CVV)
    const cardName = generateHash(req.body.cardName)
    try{
      const id = req.params.id
      const update = {
        cardNumber:cardNumber,
        CVV: CVV,
        cardName: cardName,
        Username: req.body.Username,
        CardType: req.body.CardType,
        cardExpDate: req.body.cardExpDate
      }

      const data = await Card.update(update,{
        where: {id}, returning:true
      })
      res.status(200).json(data[1][0])

    }
    catch (error){
          console.log(err)
    }
  }
  static getAllHistory(req,res){
    User.getAllHistory()
    .then(data =>{
      res.status(200).send(data)
    })
    .catch((err) => {
      res.json(err)
    })
  }
  static detailHistory(req,res){
    const id = req.params.id
    User.detailHistory(id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.json(err)
      })
  }
  

}
module.exports = Controller