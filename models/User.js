/*jshint esversion:6*/
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Card);
      }
    }
  });

  return User;
};