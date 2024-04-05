const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const UnAuthenticated = require("./unauthenticated");
const CustomApiError = require("./custom-error");

module.exports = {
  NotFoundError,
  BadRequestError,
  UnAuthenticated,
  CustomApiError,
};
