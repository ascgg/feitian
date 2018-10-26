'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize) {
  var Record = sequelize.define('record', {
    personId: {
      type: _sequelize2.default.STRING(18),
      unique: true,
      allowNull: false
    },
    account: {
      type: _sequelize2.default.STRING(64),
      unique: true
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  // If it is created for the first time, restore it to the default value.
  Record.sync().then(function () {
    Record.findAndCountAll().then(function (result) {
      if (result.count === 0) {
        Record.bulkCreate([{ personId: '000000000000000000', account: null }, { personId: '310113199203290310', account: null }]);
      }
    });
  });

  return Record;
};