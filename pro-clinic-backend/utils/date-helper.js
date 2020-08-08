const moment = require('moment');

const DateHelper = {
    isSameMonth: (date) => moment().get('month') === moment(date).get('month'),
    getCurrentMonthNumber: (date) => moment(date).get('month'),
    getDayOfCurrentMonth: () => moment().date(),
    getStartOfMonth: (date) => moment(date).startOf('month'),
    getEndOfMonth: (date) => moment(date).endOf('month')
};

module.exports = DateHelper;
