const crypto = require('crypto');
var iv = new Buffer('fedcba0987654321');
var key = new Buffer('1234567890abcdef');
var algorithm = 'aes128';


const EncryptionHelper = (function () {
  function encryptText(cipher_alg, text, encoding) {
    var cipher = crypto.createCipheriv(cipher_alg, key, iv);
    encoding = encoding || 'binary';
    var result = cipher.update(text, 'utf8', encoding);
    result += cipher.final(encoding);
    return result;
  }

  function decryptText(cipher_alg, text, encoding) {
    var decipher = crypto.createDecipheriv(cipher_alg, key, iv);
    encoding = encoding || 'binary';
    var result = decipher.update(text, encoding, 'utf8');
    result += decipher.final('utf8');
    return result;
  }

  return {
    encryptText: encryptText,
    decryptText: decryptText
  };
})();

const Helper = (function () {
  function encryptHelper(data) {
    var encText;
    encText = EncryptionHelper.encryptText(algorithm, data, 'base64');
    return encText;
  }

  function decryptHelper(data) {
    var decText;
    decText = EncryptionHelper.decryptText(algorithm, data, 'base64');
    return decText;
  }
  return {
    encryptHelper: encryptHelper,
    decryptHelper: decryptHelper
  };
})();

module.exports = Helper;