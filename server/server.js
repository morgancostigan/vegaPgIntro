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
app.get('/songs', (req, res) => {  //////////////////////////////
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

app.post('/songs', (req, res) =>{
    console.log('in /songs POST:', req.body);
    //create query string
    const queryString = `INSERT INTO songs (artist, track, rank, published)
    VALUES ($1, $2, $3, $4);`;
    pool.query(queryString, [req.body.artist, req.body.track, req.body.rank, req.body.published,]).then( ()=>{
        res.sendStatus(201);
    }).catch( (err) =>{
        console.log('error writing song:', err);
        res.sendStatus(500);
    })//end query    
})//end POST