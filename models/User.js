/*jshint esversion:6*/
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Card, {
          foreignKey:{
            name: 'created_by',
            allowNull: false
          }
        });
        User.hasMany(models.Card, {
          foreignKey:{
            name: 'assigned_to',
            allowNull: false
          }
        });
      }
    }
  });

  return User;
};