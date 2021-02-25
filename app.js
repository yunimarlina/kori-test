
const express = require('express')
const router = require('./router/router')
const port = 3000;
const app = express()



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
