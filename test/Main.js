'use strict';

var Promise = require('bluebird');
var pg = require('pg');
var Pool = Promise.promisifyAll(pg.Pool);

console.log('Pool: ', Pool);

process.on('unhandledRejection', function (reason, promise) {
    console.error('unhandledRejection', reason, promise);
});
process.on('rejectionHandled', function (promise) {
    console.error('rejectionHandled', promise);
});
process.on('promiseCreated', function (promise, child) {
    console.error('promiseCreated', promise, child);
});
process.on('promiseChained', function (promise, child) {
    console.error('promiseChained', promise, child);
});
process.on('promiseFulfilled', function (promise, child) {
    console.error('promiseFulfilled', promise, child);
});
process.on('promiseRejected', function (promise, child) {
    console.error('promiseRejected', promise, child);
});
process.on('promiseResolved', function (promise, child) {
    console.error('promiseResolved', promise, child);
});
process.on('promiseCancelled', function (promise, child) {
    console.error('promiseCancelled', promise, child);
});

function doTestStuff() {
    console.log('Doing test stuff.');
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432
    });
    console.log('pool: ', pool);
    pool.on('connect', function (client) {
        console.log('pool.on(\'connect\')', client);
    });
    pool.on('acquire', function (client) {
        console.log('pool.on(\'acquire\')', client);
    });
    pool.on('error', function (err, client) {
        console.log('pool.on(\'error\')', err, client);
    });
    console.log('Before query');
    var testPromise = pool.queryAsync('SELECT name FROM viha')
        .then(function (res) {
            console.log('Response: ', res);
        })
        .catch(function (err) {
            console.error('Error executing query', err.stack);
        })
        .finally(function () {
            pool.end();
        });
    console.log('After query');
    setInterval(function () {
        if (!testPromise.isPending()) {
            return testPromise.value;
        }
    }, 1000);
}

exports.doTestStuff = doTestStuff;