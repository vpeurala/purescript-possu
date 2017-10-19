'use strict';

var pg = require('pg');

function doTestStuff() {
    console.log('Doing test stuff.');
    var pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432
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
    var result = pool.query('SELECT name FROM viha', [], function(err, res) {
        console.log('In pool.query callback');
        if (err) {
            pool.release(err);
        }
        if (res) {
            pool.release();
        }
        console.log('err: ', err);
        console.log('res: ', res);
    });
    console.log('After query, result: ', result);
    pool.end();
    return result;
}

exports.doTestStuff = doTestStuff;