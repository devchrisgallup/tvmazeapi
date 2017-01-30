var titleDiv = ''; 
// Ajax call to wunderground's API
function fetchData() {
    titleDiv.innerHTML = ''; 
    var itemLookUp = document.getElementById('getItem').value;
    // create XMLHttpRequest object
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    // readyState 4 means the request is complete
    // status 200 means was successful
    if (this.readyState == 4 && this.status == 200) {
        // construct object
        responseData = JSON.parse(this.responseText);
        processData();
    }
    };
    xhttp.open("GET", "http://api.tvmaze.com/search/shows?q=" + itemLookUp, true);
    itemLookUp = ''; 
    xhttp.send();
    // reset input
    document.getElementById('getItem').value = '';
}

// process request data
function processData() {
    document.getElementById('top').className = 'center marginTopTwo';
    titleDiv = document.getElementById('tvshow');
    document.getElementById('tvshowtext').className = 'showText';
    // loop through the array
    for (var i = 0; i < responseData.length; i++) {
        var item = responseData[i];
        titleDiv.innerHTML += 'Name: ' + item.show.name + '<br>';
        // show if not null
        if (item.show.permiered !== null) {
                                                  // display the year by slicing the string
            titleDiv.innerHTML += 'Premiered: ' + item.show.premiered.slice(0, 4) +'<br>';
        } else {
            titleDiv.innerHTML += 'Rating: Sorry, date not available.<br>';           
        }
        // show if not null 
        if (item.show.rating.average !== null) {
            titleDiv.innerHTML += 'Rating: ' + item.show.rating.average +'<br>';
        } else {
            titleDiv.innerHTML += 'Rating: Sorry, not rated.<br>';           
        }
        titleDiv.innerHTML += 'Status: ' + item.show.status +'<br>';
        titleDiv.innerHTML += '<br>';
    }
}

// eventlisteners 
document.getElementById('processData').addEventListener('click', fetchData, false);