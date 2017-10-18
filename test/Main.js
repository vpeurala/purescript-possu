'use strict';

var Promise = require('bluebird');
var pg_pool = require('pg-pool');
var Pool = Promise.promisifyAll(pg_pool.Pool);

process.on('unhandledRejection', function (reason, promise) {
    console.error(reason, promise);
});
process.on('rejectionHandled', function (promise) {
    console.error(promise);
});
process.on('promiseCreated', function (promise, child) {
    console.error(promise, child);
});
process.on('promiseChained', function (promise, child) {
    console.error(promise, child);
});
process.on('promiseFulfilled', function (promise, child) {
    console.error(promise, child);
});
process.on('promiseRejected', function (promise, child) {
    console.error(promise, child);
});
process.on('promiseResolved', function (promise, child) {
    console.error(promise, child);
});
process.on('promiseCancelled', function (promise, child) {
    console.error(promise, child);
});

function doTestStuff() {
    console.log('Doing test stuff.');
    var pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432,
        Promise: Promise
    });
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
    pool.queryAsync('SELECT name FROM viha')
        .then(function (res) {
            console.log('Response: ', res);
        })
        .catch(function (err) {
            console.error('Error executing query', err.stack);
        });
    pool.end();
    console.log('After query');
}

exports.doTestStuff = doTestStuff;