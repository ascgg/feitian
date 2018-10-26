'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize) {
  var Project = sequelize.define('project', {
    name: {
      type: _sequelize2.default.STRING(128),
      unique: true,
      allowNull: false
    },
    description: {
      type: _sequelize2.default.STRING(256)
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  Project.sync();

  return Project;
};