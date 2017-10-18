"use strict";

const pg = require('pg');

function doTestStuff() {
    console.log('Doing test stuff.');
    const pool = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'leipuri',
        port: 5432
    });
    pool.query('SELECT name FROM viha', function (err, res) {
        console.log(err, res);
        pool.end();
    });
}

exports.doTestStuff = doTestStuff;