// requires
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const pg = require('pg');  ///////////////////////////////
// pg required for SQL
const app = express();
//uses
app.use( express.static( 'server/public/' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
//globals
const port = process.env.PORT || 5000;
const Pool = pg.Pool; //////////////////////////////
//creates Pool (class) for SQL connects
const pool = new Pool({    //////////////////////////////
    database: 'music_library',  //////////////////////////////
    host: 'localhost',  //////////////////////////////
    port: 5432,  //////////////////////////////
    max: 10,  //////////////////////////////
    idleTimeoutMillis: 30000   //////////////////////////////
})//end pool

pool.on('connect', () => {   //////////////////////////////
    console.log('connected to DB');  //////////////////////////////
})//end connect  //////////////////////////////

pool.on('error', (err) => {   //////////////////////////////
    console.log('error with DB:', err);  //////////////////////////////
})//end pool connect error  //////////////////////////////

// spin up server
app.listen( port, ( req, res )=>{
    console.log( 'server up on:', port );
});

//test route  //////////////////////////////
app.get('/test', (req, res) => {  //////////////////////////////
    console.log('/test GET hit');  //////////////////////////////
    //create a query
    const queryString = `SELECT * FROM songs;`;
    //run query on pool
    pool.query( queryString ).then( (results) =>{
        //send results back to client
        res.send(results.rows);
    }).catch( (err) => {
        //handle any errors
        console.log('error retrieving data:', err);
    })
    // res.send('grrrr');  //////////////////////////////
})//end test GET  //////////////////////////////