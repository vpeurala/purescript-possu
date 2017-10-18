'use strict';

var pg = require('pg');
var Promise = require('bluebird');

function doTestStuff() {
    console.log('Doing test stuff.');
    var pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432,
        Promise: Promise
    });
    pool.on('connect', function (client) {
        console.log("pool.on('connect')", client);
    });
    pool.on('acquire', function (client) {
        console.log("pool.on('acquire')", client);
    });
    pool.on('error', function (err, client) {
        console.log("pool.on('error')", err, client);
    });
    console.log("Before query");
    pool.query('SELECT name FROM viha')
        .then(function (res) {
            console.error(res);
        })
        .catch(function (err) {
            console.error("Error executing query", err.stack);
        });
    pool.end();
    console.log("After query");
}

exports.doTestStuff = doTestStuff;