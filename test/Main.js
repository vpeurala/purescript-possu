'use strict';

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var pg = require('pg');

var doTestPromise = function () {
    var pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432
    });
    pool.query('SELECT name FROM viha')
        .then(function (res) {
            pool.end();
            return res;
        })
        .catch(function (err) {
            pool.end();
            throw err;
        });
};

var doTestStuff = async(function () {
    var res = await(doTestPromise);
    console.log('res: ', res);
    return res;
});

exports.doTestStuff = doTestStuff;