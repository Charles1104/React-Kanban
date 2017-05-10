/*jshint esversion:6*/
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define("Card", {
        name: {
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
        assigned_to: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, {
      classMethods: {
        associate: function(models) {
          Card.belongsTo(models.User, {
            foreignKey:{
              name: 'created_by',
              allowNull: false
            }
          });
        }
      }
  });

  return Card;
};
