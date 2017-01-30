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
    // remove most of the page's top margin
    document.getElementById('top').className = 'center marginTopTwo';
    titleDiv = document.getElementById('bookTitle');
    // show title div
    document.getElementById('bookTitleText').className = 'showText';
    // loop through response array of objects
    for (var i = 0; i < responseData.length; i++) {
        // reference to current array's object
        var item = responseData[i];
        // Show Name
        titleDiv.innerHTML += 'Name: ' + item.show.name + '<br>';
        titleDiv.innerHTML += 'Premiered: ' + item.show.premiered.slice(0, 4) +'<br>';
        if (item.show.rating.average !== null) {
            titleDiv.innerHTML += 'Rating: ' + item.show.rating.average +'<br>';
        } else {
            titleDiv.innerHTML += 'Rating: Sorry, not rated.<br>';           
        }
        titleDiv.innerHTML += 'Status: ' + item.show.status +'<br>';
        titleDiv.innerHTML += '<br>';

    }
    var names = responseData; 
    console.log(names[0].show.premiered.slice(0, 4));
}

// eventlisteners 
document.getElementById('processData').addEventListener('click', fetchData, false);