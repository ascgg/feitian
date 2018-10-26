'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.changePassword = changePassword;
var encryptionHelper = require('./encrypt-decrypt.js');
var db = require('./models');

// Called when user clicks create account.
function createUser(info, errorHelper, successHelper) {
  var user = db.user;
  var record = db.record;
  var personId = info.personId;
  var account = encryptionHelper.encryptHelper(info.account);
  var password = encryptionHelper.encryptHelper(info.password);
  // Firstly check the person ID, then check the account usage.
  record.findAndCountAll({ where: { personId: personId } }).then(function (result) {
    if (result.count === 1) {
      if (result.rows[0].get({ plain: true }).account !== null) {
        errorHelper(Error('该用户已创建账户，请直接登录'));
      } else {
        user.create({ account: account, password: password }).then(function (item) {
          result.rows[0].update({ account: account }).then(function (item) {
            successHelper();
          });
        }).catch(function (error) {
          errorHelper(Error('账户名已存在，请选择另一个账户名'));
        });
      }
    } else {
      // Not found, stop and return error.
      errorHelper(Error('该用户信息不存在'));
    }
  });
}

// Called when user clicks login.
function loginUser(info, errorHelper, successHelper) {
  var user = db.user;
  // Get the global user registry, and try to compare the info with entries.
  var account = encryptionHelper.encryptHelper(info.account);
  var password = encryptionHelper.encryptHelper(info.password);
  user.findAndCountAll({ where: { account: account } }).then(function (result) {
    if (result.count === 1) {
      if (result.rows[0].get({ plain: true }).password !== password) {
        errorHelper(Error('密码不正确'));
      } else {
        successHelper();
      }
    } else {
      errorHelper(Error('该账户名不存在'));
    }
  });
}

function changePassword(info, errorHelper, successHelper) {
  var user = db.user;
  // If the user is found and the password is right, change to the new one.
  // Else report error.
  var oldPassword = encryptionHelper.encryptHelper(info.oldPassword);
  var newPassword = encryptionHelper.encryptHelper(info.newPassword);
  var account = encryptionHelper.encryptHelper(info.account);
  user.findAndCountAll({ where: { account: account } }).then(function (result) {
    if (result.count === 1) {
      var item = result.rows[0];
      if (item.get({ plain: true }).password !== oldPassword) {
        errorHelper(Error('原密码不正确'));
      } else {
        item.update({ password: newPassword }).then(function (i) {
          successHelper();
        });
      }
    } else {
      errorHelper(Error('该账户名不存在'));
    }
  });
}