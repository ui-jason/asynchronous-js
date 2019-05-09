// Async JS

// setTimeout example
// example goes here


// Callback example

function getData(callback) {
    $.get("example.php", callback);
}

getData(function(data) {
    console.log("The data is: " + data);
});


// Common Problem: Scope Issues with Callbacks Inside Loops

// bad
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i + " second(s) elapsed");
    }, i * 1000);
}

// not quite
for (var i = 1; i <= 3; i++) {
    (function() {
        console.log(i + " second(s) elapsed");
    })();
}

// good (closure)
for (var i = 1; i <= 3; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i + " second(s) elapsed");
        }, i * 1000);
    })(i);
}

// good (ES6)
for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
      console.log(i + " second(s) elapsed");
    }, i * 1000);
  }



  // TODO:
  // See how FB feature uses promises
  // Make very simple API (to retrieve image paths from JSON?)
  // Make an example w/ callbacks, then w/ promises

  function getData(options, callback) {
    $.get("example.php", options, function(response) {
      callback(null, JSON.parse(response));
    }, function() {
      callback(new Error("AJAX request failed!"));
    });
  }

  // usage
getData({name: "John"}, function(err, data) {
    if(err) {
      console.log("Error! " + err.toString())
    } else {
      console.log(data);
    }
  });