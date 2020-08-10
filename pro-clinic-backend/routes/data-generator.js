const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middleware/authorization');
const httpResponseHelper = require('../utils/http/http-response-helper');
const dummyDataDb = require('../db/dummy-data-db');
const jwtHelper = require('../utils/jwt-helper');

router.get('/', (req, res) => {
    res.send('Welcome to the Pro Clinic dummy data generator API!');
});

// Don't generate for weekends
router.use(authenticationMiddleware).get('/visits', async (req, res, next) => {
    const userId = jwtHelper.getUserIdFromToken(req.header('Authorization'));
    const month = req.header('month');

    if (!month) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing month header.'
        });
        return;
    }

    const result = await dummyDataDb.generateVisits(month, userId);

    if (!result) {
        httpResponseHelper.badRequest(res, {
            message: 'Failed to generate dummy data.'
        });
        return;
    }

    // TODO: Create some enums like VisitsGenerateResult to hold those strings
    if (result === 'Already generated') {
        httpResponseHelper.badRequest(res, {
            message: 'Dummy data was already generated for this month.'
        });
        return;
    }

    httpResponseHelper.success(res, {
        message: 'Successfully generated dummy data.'
    });
});

router.use(authenticationMiddleware).get('/emergencies', async (req, res) => {
    const userId = jwtHelper.getUserIdFromToken(req.header('Authorization'));
    const month = req.header('month');

    if (!month) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing month header.'
        });
        return;
    }

    const result = await dummyDataDb.generateEmergencies(month, userId);

    if (!result) {
        httpResponseHelper.badRequest(res, {
            message: 'Failed to generate dummy data.'
        });
        return;
    }

    if (result === 'Already generated') {
        httpResponseHelper.badRequest(res, {
            message: 'Dummy data was already generated for this month.'
        });
        return;
    }

    httpResponseHelper.success(res, {
        message: 'Successfully generated dummy data.'
    });
});

router.use(authenticationMiddleware).get('/shifts', async (req, res) => {
    const userId = jwtHelper.getUserIdFromToken(req.header('Authorization'));
    const month = req.header('month');

    if (!month) {
        httpResponseHelper.badRequest(res, {
            message: 'Missing month header.'
        });
        return;
    }

    const result = await dummyDataDb.generateShifts(month, userId);

    if (!result) {
        httpResponseHelper.badRequest(res, {
            message: 'Failed to generate dummy data.'
        });
        return;
    }

    if (result === 'Already generated') {
        httpResponseHelper.badRequest(res, {
            message: 'Dummy data was already generated for this month.'
        });
        return;
    }

    httpResponseHelper.success(res, {
        message: 'Successfully generated dummy data.'
    });
});

module.exports = router;
