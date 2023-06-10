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
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        console.log({ privateKey, publicKey });

        const keyToken = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        if (!keyToken) {
          return {
            code: "xxx",
            message: "keyToken error",
          };
        }
        console.log(`keyToken::`, keyToken);

        const tokens = await createTokensPair(
          { userId: newShop._id, email },
          publicKey,
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
