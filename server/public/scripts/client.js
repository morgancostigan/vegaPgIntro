$( document ).ready( readyNow );

function addSong() {
    //get user inputs
    //package in an object
    //send to server via AJAX
    const objectToSend = {
        artist: $('#artistIn').val(),
        track: $('#trackIn').val(),
        published: $('#publishedIn').val(),
        rank: $('#rankIn').val(),
    }//end objectToSend
    console.log('sending', objectToSend);
    $.ajax({
        method: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function (response) {
        console.log('back from POST with:', response);
    }).catch( function (err) {
        console.log('error retrieving data:', err);
    })
    getSongs();
}// end addSong function

function getSongs() {
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then( function (response) {
        console.log('back from GET with:', response);
        
    }).catch( function (err) {
        console.log('error GETTING:', err);
    })
}//end getSongs function

function readyNow(){
    console.log( 'JQ' );
    $('#addSongButton').on('click', addSong)
    getSongs();
} // end readynow