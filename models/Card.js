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
          type: DataTypes.ENUM('Queue','Progress','Done'),
          allowNull: false
        }
      }, {
      classMethods: {
        associate: function(models) {
          Card.belongsTo(models.User, {
            as: 'Creator',
            foreignKey:{
              name: 'created_by',
              allowNull: false
            }
          });
          Card.belongsTo(models.User, {
            as: 'Assignor',
            foreignKey:{
              name: 'assigned_to',
              allowNull: false
            }
          });
        }
      }
  });

  return Card;
};
