const respondForms = require("../utils/respondForms");

module.exports.errorHandler = (err, req, res, _) => {
    res.send(respondForms.error(err.message));
};
