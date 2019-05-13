// This runs on demo.html

////////////////////////////////
// SET TIMEOUT
////////////////////////////////

function setTimeoutTest() {
    console.log('1');

    setTimeout(function() {
        console.log('2');
    }, 1500);

    console.log('3');
}

////////////////////////////////
// METHOD WITH A CALLBACK
////////////////////////////////

function bye() {
    $('body').animate({
        opacity: 0
    }, 5000, function() { // a callback
        console.log('1');
    })

    console.log('2');
}

////////////////////////////////
// EVENT HANDLER
////////////////////////////////

$(document).on('click', '[type="submit"]', function() {
    var theCity = $('.city').val();
    // citySearchCallbacks(theCity);

    // TODO: define this
    // citySearchjQPromises(theCity);

    citySearchES6Promises(theCity);
});

////////////////////////////////
// MULTIPLE CALLBACKS
////////////////////////////////

function citySearchCallbacks(chosenCity) {
    var cityID;
    
    // Callbacks
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + chosenCity,
        success: function(data) {
            // console.log(data);

            try {
                cityID = data[0].woeid;
                console.log(cityID);
            } catch {
                console.log('City not found :(');
            }

            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + cityID + '/',
                success: function(data) {
                    console.log(`Today's weather: ${data.consolidated_weather[0].weather_state_name}`);

                    $.ajax({
                        url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + cityID + '/',
                        success: function(data) {
                    console.log(`Tomorrow's weather: ${data.consolidated_weather[1].weather_state_name}`);
                        }
                    })
                }
            })
        },
        error: function() {
            console.log('AJAX error');
        }
    });
}

////////////////////////////////
// TODO (ignore this)
////////////////////////////////

// function citySearchjQPromises(chosenCity) {
//     // note: jQ ajax returns a promise object, so you can use promise methods on it (I guess)
// }

////////////////////////////////
// PROMISES
////////////////////////////////

function citySearchES6Promises(chosenCity) {
    // PROMISE OBJECTS

    var getCityID = new Promise(function(resolve, reject) {
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=' + chosenCity,
            success: function(data) {
                console.log(data);
                resolve(data);
            },
            error: function(error) {
                console.log(error);
                reject(error);
            }
        })
    });

    var getTodaysWeather = function(cityID) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + cityID + '/',
                success: function(data) {
                    resolve(data.consolidated_weather[0].weather_state_name);
                }
            });
        });
    }

    var getTomorrowsWeather = function(cityID) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + cityID + '/',
                success: function(data) {
                    resolve(data.consolidated_weather[1].weather_state_name);
                }
            })
        })
    }

    // END PROMISE OJECTS

    var thisCityID;

    // Consume the promise objects
    getCityID
    .then(function(result) {
        thisCityID = result[0].woeid;
        console.log(thisCityID);
        return getTodaysWeather(thisCityID);
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function(result) {
        console.log(`Today's weather: ${result}`);
        return getTomorrowsWeather(thisCityID)
    }).then(function(result) {
        console.log(`Tomorrow's weather: ${result}`);
    })




    // getCityID
    // .then(function(result) {
    //     thisCityID = result[0].woeid;
    //     console.log(thisCityID);
    // })
    // .catch(function(error) {
    //     console.log(error);
    // })

    // console.log(await getCityID());
}