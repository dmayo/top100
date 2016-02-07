// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('');
    getData(0);
}

function getData(num){
    $.ajax({
      url:"https://www.kimonolabs.com/api/",
      crossDomain: true,
      dataType: "jsonp",
      success: function (response) {
        response=response.results.collection1[num];
        song=response.song;
        artist=response.artist.text;
        //var responseString = JSON.stringify(song, '', 2);
        //document.getElementById('response').innerHTML += responseString;
        search(song,artist);
      },
      error: function (xhr, status) {
        //handle errors
      }
    });
}

function search(song,artist) {


    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'id',
        q: song+' '+artist,
        maxResults: 1
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}
var first=true;
// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    videoID = String(response.items[0].id.videoId);
    //alert(videoID);
    if(first==true){
        var script = document.createElement('script');
        script.src = "http://www.youtube.com/player_api";
        document.head.appendChild(script);
        first=false;
    }
    else{
        $("#player").fadeIn(1500);
        player.loadVideoById(videoID);
    }

    //showResponse(videoID);
    //showResponse(response);
    //showResponse('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>');
    //responseString='<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
    //document.getElementById('response').innerHTML += responseString;

}
