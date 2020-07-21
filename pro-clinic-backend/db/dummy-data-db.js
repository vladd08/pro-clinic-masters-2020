const moment = require('moment');
const faker = require('faker');

const firebaseHelper = require('../utils/firebase-helper');
const random = require('../utils/random');

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
                            random.getBetween(1, 28)
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
    }
};

module.exports = DummyDataDb;
