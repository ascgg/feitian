'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize) {
  var Table = sequelize.define('table', {
    name: {
      type: _sequelize2.default.STRING(255), // NAME_PROJECT, like `table_123`. 255 is enough.
      unique: true,
      allowNull: false
    },
    category: {
      type: _sequelize2.default.STRING(16),
      allowNull: false
    },
    type: {
      type: _sequelize2.default.STRING(10),
      allowNull: false
    },
    project: {
      type: _sequelize2.default.INTEGER,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  Table.sync();

  return Table;
};