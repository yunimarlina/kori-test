const bcrypt = require('bcryptjs')

function generateHash (pass) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(pass, salt)
  return hash
}

function verifyHash (pass, hashPass) {
  return bcrypt.compareSync(pass, hashPass)
}

module.exports = {generateHash, verifyHash}