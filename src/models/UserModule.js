const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const { compare, hash } = require("bcryptjs");
const TypeError = require("../errors/TypeError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { noCorrectEmail, incorrectLoginData, incorrectTypeEmail } =
  require("../constants/messages").errors;

const UserModuleScheme = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: noCorrectEmail,
    },
  },
  passwordHash: { type: String, required: true, select: false },
  name: { type: String, required: true },
  contactPhone: String,
});

UserModuleScheme.statics = {
  async create({ password, ...data }) {
    try {
      const passwordHash = await hash(password, 10);
      const newUser = new this({ ...data, passwordHash });
      await newUser.save();
      return newUser;
    } catch (error) {
      // TODO проверить срабатывание ошибки
      return error;
    }
  },
  async findByEmail(email) {
    try {
      if (!(typeof email === "string" || email instanceof String)) {
        throw new TypeError(incorrectTypeEmail);
      }
      const user = await this.findOne({ email });
      return user;
    } catch (error) {
      // TODO проверить срабатывание ошибки
      return error;
    }
  },
  async findByCredentials(email, password) {
    try {
      const user = await this.findOne({ email }).select("+passwordHash");
      if (!user) {
        throw new UnauthorizedError(incorrectLoginData);
      }
      const isCorrectPassword = await compare(password, user.passwordHash);
      if (!isCorrectPassword) {
        throw new UnauthorizedError(incorrectLoginData);
      }
    } catch (error) {
      // TODO проверить срабатывание ошибки
      return error;
    }
  },
};

module.exports.UserModule = model("UserModule", UserModuleScheme);
