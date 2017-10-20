'use strict';

var Promise = require('bluebird');
var pg = require('pg');
var Fiber = require('fibers');

var doTestPromise = function () {
    var pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432,
        Promise: Promise
    });
    return pool.query('SELECT name FROM viha')
        .then(function (res) {
            console.log('.then: ', res);
            return res;
        })
        .catch(function (err) {
            console.log('.catch: ', err);
            throw err;
        });
};

var doTestStuff = function () {
    Fiber(function () {
        var res = doTestPromise();
        console.log('res: ', res);
        while (res.isPending()) {
            console.log('before sleep');
            sleep(10);
            console.log('after sleep');
        }
        console.log('returning res: ', res);
        return res.value;
    }).run();
};

function sleep(ms) {
    var fiber = Fiber.current;
    setTimeout(function () {
        fiber.run();
    }, ms);
    Fiber.yield();
}

exports.doTestStuff = doTestStuff;