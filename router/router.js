const router = require('express').Router()
const Controller = require('../Controller/Controller')
const auth = require('../middlewares/auth')

router.post('/register',Controller.register)
router.post('/login', Controller.login)
router.get('/users',Controller.getAllUsers)
router.get('/activeUsers',Controller.getActiveUsers)
router.use(auth)
router.post('/card',Controller.addCard)
router.get('/user/:id',Controller.detailUser)
router.delete('/card/:id',Controller.deleteCard)
router.put('/card/:id',Controller.editCard)
router.get('/history/',Controller.getAllHistory)
router.get('/history/:id',Controller.detailHistory)
module.exports = router