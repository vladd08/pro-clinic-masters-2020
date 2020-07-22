const moment = require('moment');
const faker = require('faker');

const firebaseHelper = require('../utils/firebase-helper');
const random = require('../utils/random');

// TODO: Extract code
// TODO: If month is not current month, generate for all days. If current, generate until current day - 1
const DummyDataDb = {
    generateEmergencies: (month, userId) => {
        const db = firebaseHelper.getDb();
        const emergenciesCollection = db.collection('emergencies');
        const monthToGenerateFor = moment(month, 'MM');

        const minEmergenciesCount = 10;
        const maxEmergenciesCount = 25;
        const ratio = 2.75;
        const emergenciesCount =
            random.getBetween(minEmergenciesCount, maxEmergenciesCount) * ratio;

        const promises = [];

        for (let i = 0; i < emergenciesCount; i += 1) {
            const pr = new Promise((resolve, reject) => {
                emergenciesCollection
                    .doc()
                    .set({
                        date: moment(monthToGenerateFor).set(
                            'date',
                            random.getBetween(1, moment.utc().get('date') - 1)
                        ),
                        patientName: faker.name.findName(),
                        emergency: faker.lorem.sentence(),
                        userId: userId
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => reject());
            });

            promises.push(pr);
        }

        const promise = new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    reject(null);
                });
        });

        return promise;
    },
    // TODO: Don't generate 2 in the same day
    generateShifts: (month, userId) => {
        const db = firebaseHelper.getDb();
        const shiftsCollection = db.collection('shifts');
        const monthToGenerateFor = moment(month, 'MM');

        const minShiftsCount = 5;
        const maxShiftsCount = 10;
        const shiftsCount = random.getBetween(minShiftsCount, maxShiftsCount);

        const promises = [];

        for (let i = 0; i < shiftsCount; i += 1) {
            const pr = new Promise((resolve, reject) => {
                shiftsCollection
                    .doc()
                    .set({
                        date: moment(monthToGenerateFor).set(
                            'date',
                            random.getBetween(1, moment.utc().get('date') - 1)
                        ),
                        userId: userId,
                        hours: random.getBetween(4, 10)
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => reject());
            });

            promises.push(pr);
        }

        const promise = new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    reject(null);
                });
        });

        return promise;
    },
    generateVisits: (month, userId) => {
        const db = firebaseHelper.getDb();
        const visitsCollection = db.collection('visits');
        const monthToGenerateFor = moment(month, 'MM');

        const minVisitsCount = 15;
        const maxVisitsCount = 20;
        const visitsCount = random.getBetween(minVisitsCount, maxVisitsCount);

        const promises = [];

        for (let i = 0; i < visitsCount; i += 1) {
            const pr = new Promise((resolve, reject) => {
                visitsCollection
                    .doc()
                    .set({
                        date: moment(monthToGenerateFor).set(
                            'date',
                            random.getBetween(1, moment.utc().get('date') - 1)
                        ),
                        userId: userId,
                        patientName: faker.name.findName(),
                        reason: faker.lorem.paragraph()
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => reject());
            });

            promises.push(pr);
        }

        const promise = new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    reject(null);
                });
        });

        return promise;
    },
    generateVisits: (month, userId) => {
        const db = firebaseHelper.getDb();
        const visitsCollection = db.collection('visits');
        const monthToGenerateFor = moment(month, 'MM');

        const minVisitsCount = 15;
        const maxVisitsCount = 20;
        const visitsCount = random.getBetween(minVisitsCount, maxVisitsCount);

        const promises = [];

        for (let i = 0; i < visitsCount; i += 1) {
            const pr = new Promise((resolve, reject) => {
                visitsCollection
                    .doc()
                    .set({
                        date: moment(monthToGenerateFor).set(
                            'date',
                            random.getBetween(1, moment.utc().get('date') - 1)
                        ),
                        userId: userId,
                        patientName: faker.name.findName(),
                        reason: faker.lorem.paragraph()
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(() => reject());
            });

            promises.push(pr);
        }

        const promise = new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(() => {
                    resolve({
                        message: 'Generated.'
                    });
                })
                .catch(() => {
                    reject(null);
                });
        });

        return promise;
    }
};

module.exports = DummyDataDb;
