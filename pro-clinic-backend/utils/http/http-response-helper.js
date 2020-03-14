const HttpCodes = {
  Success: 200,
  BadRequest: 400,
  NotFound: 404
};

const HttpResponseHelper = {
  badRequest: (res, payload) => {
    res.status(HttpCodes.BadRequest);
    res.json(payload);
  },
  success: (res, payload) => {
    res.status(HttpCodes.Success), res.json(payload);
  }
};

module.exports = HttpResponseHelper;
