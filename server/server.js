// requires
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const pg = require('pg');  ///////////////////////////////
const app = express();
//uses
app.use( express.static( 'server/public/' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
//globals
const port = process.env.PORT || 5000;
const Pool = pg.Pool; //////////////////////////////
const pool = new Pool({    //////////////////////////////
    database: 'music_library',  //////////////////////////////
    host: 'localhost',  //////////////////////////////
    port: 5432,  //////////////////////////////
    max: 10,  //////////////////////////////
    idleTimeoutMillis: 30000   //////////////////////////////
})
// spin up server
app.listen( port, ( req, res )=>{
    console.log( 'server up on:', port );
});