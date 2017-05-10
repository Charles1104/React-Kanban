/*jshint esversion:6*/
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        priority: {
          type: DataTypes.STRING,
          defaultValue: "Queue"
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        },
        created_by: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }, {
      classMethods: {
        associate: function(models) {
          Card.belongsTo(models.User);
        }
      }
    });

  return Card;
};
