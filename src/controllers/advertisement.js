/**
 *@typedef {import("../../types.js").TController} TController
 */

const { errors } = require("../constants/messages");
const NoExistError = require("../errors/NoExistError");
const { Advertisement } = require("../models/Advertisement");
const respondForms = require("../utils/respondForms");

module.exports.getAdvs = async (req, res, next) => {
  try {
    const advs = await Advertisement.search();
    res.send(respondForms.data(advs));
  } catch (error) {
    next(error);
  }
};

module.exports.getAdvById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const advs = await Advertisement.search({ id });
    if (advs.length === 0) throw new NoExistError(errors.notFoundById);
    res.send(respondForms.data(advs));
  } catch (error) {
    next(error);
  }
};

/**@type TController */
module.exports.createAdv = async (req, res, next) => {
  const { body, files, user } = req;

  const data = {
    ...body,
    images: files.map((file) => "/" + file.path),
  };

  try {
    const { id, createdAt } = await Advertisement.create({
      ...data,
      userId: user.id,
    });

    res.send(
      respondForms.data({
        ...data,
        id,
        createdAt,
        user: { id: user.id, name: user.name },
      })
    );
  } catch (error) {
    next(error);
  }
};
