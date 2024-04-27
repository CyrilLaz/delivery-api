const { nonUniqueEmail, noCorrectEmail } =
  require("../constants/messages").errors;
const {
  nonUniqueStatus,
  defaultErrorStatus,
  dataErrorStatus,
} = require("../constants/statusCodes");
// const { dataErrorStatus } = require("../constants/statusCodes");
// const DublicateError = require("../errors/DublicateError");
const NoExistError = require("../errors/NoExistError");
const NotEnoughRightError = require("../errors/NotEnoughRightError");
const TypesError = require("../errors/TypesError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const respondForms = require("../utils/respondForms");

module.exports.errorHandler = (err, req, res, _) => {
  const { statusCode = defaultErrorStatus, message } = err;
  console.log(err);
  if (
    err instanceof NoExistError ||
    err instanceof UnauthorizedError ||
    err instanceof NotEnoughRightError ||
    //   || err instanceof TooManyRequestError
    err instanceof TypesError
  ) {
    return res.status(statusCode).send(respondForms.error(message));
  }
  if (err.name === "ValidationError") {
    if (err.errors.email) {
      return res
        .status(dataErrorStatus)
        .send(respondForms.error(noCorrectEmail));
    }
  }

  if (err.code === 11000) {
    return res.status(nonUniqueStatus).send(respondForms.error(nonUniqueEmail));
  }
  res
    .status(defaultErrorStatus)
    .send(respondForms.error("Что-то пошло не так"));
};
