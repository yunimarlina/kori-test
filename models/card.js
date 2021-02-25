'use strict';
const {generateHash} = require('../helpers/bycripts')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Card.init({
    cardNumber: DataTypes.STRING,
    CVV: DataTypes.STRING,
    cardName: DataTypes.STRING,
    Username: DataTypes.STRING,
    CardType: {
      type: DataTypes.ENUM,
      values: ["Master","Visa"]
    },
    cardExpDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });

  Card.beforeCreate((instance, options) => {
    instance.cardNumber = generateHash(instance.cardNumber)
    instance.CVV = generateHash(instance.CVV)
    instance.cardName = generateHash(instance.cardName)
   })
  return Card;
};