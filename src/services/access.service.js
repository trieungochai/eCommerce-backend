"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokensPair } = require("../utils/auth.util");
const { retrieveData } = require("../utils");

const Role = {
  WRITER: "1",
  EDITOR: "2",
  ADMIN: "3",
  SHOP: "4",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const existingEmail = await shopModel.findOne({ email }).lean();
      if (existingEmail) {
        return {
          code: "xxxx",
          message: "Email already registered!",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPassword,
        role: [Role.SHOP],
      });

      if (newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        console.log({ privateKey, publicKey });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "publicKeyString error",
          };
        }
        console.log(`publicKeyString::`, publicKeyString);

        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        console.log(`publicKeyObject::`, publicKeyObject);

        const tokens = await createTokensPair(
          { userId: newShop._id, email },
          publicKeyString,
          privateKey
        );

        console.log(`Token created successfully::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: retrieveData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
