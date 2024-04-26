const { UPLOAD_FOLDER } = require("../constants/connect-config");
const { UserModule } = require("../models/UserModule");
const { createDirectory } = require("../utils/createDirectory");
const respondForm = require("../utils/respondForms");

module.exports.signUp = async (req, res, next) => {
  const { email, password, name, contactPhone } = req.body;

  try {
    const { id } = await UserModule.create({
      email,
      password,
      name,
      contactPhone,
    });
    createDirectory(UPLOAD_FOLDER + "/" + id);
    res.send(respondForm.data({ id, name, email, contactPhone }));
  } catch (error) {
    return next(error);
  }
};

module.exports.signIn = async (req, res, next) => {
  const { id, email, contactPhone, name } = req.user;
  res.send(respondForm.data({ id, email, contactPhone, name }));
};
