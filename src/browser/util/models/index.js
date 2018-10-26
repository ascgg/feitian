import { app } from 'electron'
import Sequelize from 'sequelize'
import path from 'path'
const encryptionHelper = require('../encrypt-decrypt.js');


var db = {};

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  logging: false,
  storage: path.join(app.getPath('userData'), '063A6429-2634-496C-B15E-F1C01AD52A81')
});

sequelize.sync().then(function () {
  const project = sequelize.define(encryptionHelper.encryptHelper('project'), {
    name: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['project'] = project;
  project.sync();

  const record = sequelize.define(encryptionHelper.encryptHelper('record'), {
    personId: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false
    },
    account: {
      type: Sequelize.TEXT,
      unique: true
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['record'] = record;
  record.sync().then(function () {
    record.findAndCountAll().then(function (result) {
      if (result.count === 0) {
        record.bulkCreate([
          { personId: '480819DF0B86468C', account: null },
          { personId: '0000000000000000', account: null }
        ])
      }
    })
  });

  const table = sequelize.define(encryptionHelper.encryptHelper('table'), {
    name: {
      type: Sequelize.TEXT, // NAME_PROJECT, like `table_123`. 255 is enough.
      unique: true,
      allowNull: false
    },
    category: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    project: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['table'] = table;
  table.sync();

  const user = sequelize.define(encryptionHelper.encryptHelper('user'), {
    account: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });
  db['user'] = user;
  user.sync();
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.query = sequelize.getQueryInterface();

module.exports = db;
