'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize) {
  var User = sequelize.define('user', {
    account: {
      type: _sequelize2.default.STRING(32),
      unique: true,
      allowNull: false
    },
    password: {
      type: _sequelize2.default.STRING(32),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  User.sync();

  return User;
};