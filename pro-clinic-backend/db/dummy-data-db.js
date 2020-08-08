const moment = require('moment');
const faker = require('faker');

const firebaseHelper = require('../utils/firebase-helper');
const random = require('../utils/random');
const dateHelper = require('../utils/date-helper');

const DummyDataDb = {
    generateVisits: async (month, userId) => {
        const db = firebaseHelper.getDb();
        const visitsCollection = db.collection('visits');
        const monthToGenerateFor = moment(month, 'MM');

        const minVisitsCount = 5;
        const maxVisitsCount = 10;
        const visitsCount = random.getBetween(minVisitsCount, maxVisitsCount);

        const alreadyGeneratedResult = await hasAlreadyGenerated(
            visitsCollection,
            monthToGenerateFor
        );

        if (alreadyGeneratedResult) {
            return new Promise((resolve) => {
                resolve('Already generated');
            });
        }

        const addVisitPromise = (resolve) => {
            visitsCollection
                .doc()
                .set({
                    date: generateDate(monthToGenerateFor),
                    userId: userId,
                    patientName: faker.name.findName(),
                    reason: faker.lorem.paragraph()
                })
                .then(() => {
                    // Only because empty resolve in our case means error
                    resolve('Generated');
                })
                .catch(() => {
                    // Resolve(null) instead of reject so we don't clutter the caller code with catch blocks
                    resolve();
                });
        };

        const promises = getGenerationPromises(visitsCount, addVisitPromise);

        const promise = new Promise((resolve) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    resolve(null);
                });
        });

        return promise;
    },
    generateEmergencies: async (month, userId) => {
        const db = firebaseHelper.getDb();
        const emergenciesCollection = db.collection('emergencies');
        const monthToGenerateFor = moment(month, 'MM');

        const minEmergenciesCount = 10;
        const maxEmergenciesCount = 15;
        const emergenciesCount = random.getBetween(
            minEmergenciesCount,
            maxEmergenciesCount
        );

        const alreadyGeneratedResult = await hasAlreadyGenerated(
            emergenciesCollection,
            monthToGenerateFor
        );

        if (alreadyGeneratedResult) {
            return new Promise((resolve) => {
                resolve('Already generated');
            });
        }

        const addEmergencyPromise = (resolve) => {
            emergenciesCollection
                .doc()
                .set({
                    date: generateDate(monthToGenerateFor),
                    patientName: faker.name.findName(),
                    emergency: faker.lorem.sentence(),
                    userId: userId
                })
                .then(() => {
                    resolve('Generated');
                })
                .catch(() => {
                    resolve();
                });
        };

        const promises = getGenerationPromises(
            emergenciesCount,
            addEmergencyPromise
        );

        const promise = new Promise((resolve) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    resolve(null);
                });
        });

        return promise;
    },
    // TODO: Don't generate 2 in the same day
    generateShifts: async (month, userId) => {
        const db = firebaseHelper.getDb();
        const shiftsCollection = db.collection('shifts');
        const monthToGenerateFor = moment(month, 'MM');

        const minShiftsCount = 5;
        const maxShiftsCount = 10;
        const shiftsCount = random.getBetween(minShiftsCount, maxShiftsCount);

        const alreadyGeneratedResult = await hasAlreadyGenerated(
            shiftsCollection,
            monthToGenerateFor
        );

        if (alreadyGeneratedResult) {
            return new Promise((resolve) => {
                resolve('Already generated');
            });
        }

        const addShiftPromise = (resolve) => {
            shiftsCollection
                .doc()
                .set({
                    date: generateDate(monthToGenerateFor),
                    userId: userId,
                    hours: random.getBetween(4, 10)
                })
                .then(() => {
                    resolve('Generated');
                })
                .catch(() => {
                    resolve();
                });
        };

        const promises = getGenerationPromises(shiftsCount, addShiftPromise);

        const promise = new Promise((resolve) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    resolve(null);
                });
        });

        return promise;
    }
};

function generateDate(monthToGenerateFor) {
    return moment(monthToGenerateFor).set(
        'date',
        !dateHelper.isSameMonth(monthToGenerateFor)
            ? random.getBetween(1, moment().daysInMonth())
            : random.getBetween(1, dateHelper.getDayOfCurrentMonth() - 1)
    );
}

function hasAlreadyGenerated(collection, monthToGenerateFor) {
    return new Promise((resolve) => {
        collection
            .limit(1)
            .where(
                'date',
                '>=',
                dateHelper.getStartOfMonth(monthToGenerateFor).toDate()
            )
            .where('date', '<=', dateHelper.getEndOfMonth(monthToGenerateFor))
            .get()
            .then((querySnapshot) => {
                let exists = false;

                querySnapshot.forEach((doc) => {
                    exists = true;
                });

                resolve(exists);
            });
    });
}

// Typescript would've been so good here so we could've said promise is actually a function that needs resolve as a param
function getGenerationPromises(count, promise) {
    const promises = [];

    for (let i = 0; i < count; i += 1) {
        const pr = new Promise((resolve) => {
            promise(resolve);
        });

        promises.push(pr);
    }

    return promises;
}

module.exports = DummyDataDb;
