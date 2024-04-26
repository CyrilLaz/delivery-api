const UnauthorizedError = require("../errors/UnauthorizedError.js");

/**
 *@type {import("../../types.js").TController
 */
module.exports.protectRoute = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new UnauthorizedError("Пользователь не аутентифицирован"));
  }
  next();
};
