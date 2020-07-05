const HttpCode = {
    Success: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
};

const HttpResponseHelper = {
    badRequest: (res, payload) => {
        res.status(HttpCode.BadRequest);
        res.json(payload);
    },
    success: (res, payload) => {
        res.status(HttpCode.Success);
        res.json(payload);
    },
    notFound: (res, payload) => {
        res.status(HttpCode.NotFound);
        res.json(payload);
    },
    notAuthorized: (res, payload) => {
        res.status(HttpCode.Unauthorized);
        res.json(payload);
    }
};

module.exports = HttpResponseHelper;
