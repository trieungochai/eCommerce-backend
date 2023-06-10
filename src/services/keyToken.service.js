"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const token = await keyTokenModel.create({
        userId,
        publicKey,
        privateKey,
      });

      return token ? token.publicKey : null;
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = KeyTokenService;
