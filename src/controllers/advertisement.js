/**
 *@typedef {import("../../types.js").TController} TController
 */

const { errors } = require("../constants/messages");
const NoExistError = require("../errors/NoExistError");
const NotEnoughRightError = require("../errors/NotEnoughRightError.js");
const { Advertisement } = require("../models/Advertisement");
const respondForms = require("../utils/respondForms");
const { transformAdv } = require("../utils/transformAdv.js");

module.exports.getAdvs = async (req, res, next) => {
  try {
    const advs = (await Advertisement.search().forRespond()).map(transformAdv);
    res.send(respondForms.data(advs));
  } catch (error) {
    next(error);
  }
};

module.exports.getAdvById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adv = transformAdv((await Advertisement.search({ _id: id }).forRespond())[0]);
    if (!adv) throw new NoExistError(errors.notFoundById);
    res.send(respondForms.data(adv));
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
    const adv = transformAdv(
      await Advertisement.create({
        ...data,
        userId: user.id,
      })
    );

    res.send(respondForms.data(adv));
  } catch (error) {
    next(error);
  }
};

/**@type TController */
module.exports.deleteAdv = async (req, res, next) => {
  const { id } = req.params,
    { user } = req;
  try {
    if (!(await Advertisement.isOwnerOf(id, user.id))) {
      throw new NotEnoughRightError(errors.notAuthorAdv);
    }
    await Advertisement.delete(id);

    res.send(respondForms.data());
  } catch (error) {
    next(error);
  }
};
