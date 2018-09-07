
// GLOBAL VARIABLES AND ARRAYS
// ==============================================================================
// Array of gif buttons
var gifButtons = ['Tiger Woods', 'Lebron James', 'Aaron Judge', 'Odell Beckham', 'Serena Williams'];

// FUNCTIONS
// ==============================================================================
// Function to display gif and info
function displayGif() {
    // Remove any gifs that have previously been loaded
    $('#gifs-view').empty();
    // Retrieve the value of data-name that is associated with each button
    var gif = $(this).attr("data-name");
        // Build url using Giphy API documentation
        // Set the limit parameter to 10 and the rating paramter to 'g'
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&limit=10&rating=g&rating=pg&api_key=6aBA6hxDJKQttqlFkPei1tttwWWjxv2p';
        console.log(queryURL);

        // Create AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: 'GET'
        }).then(function(response) {
            // Loop through JSON and retrieve the rating and gif url for all 10 results
            for (var i = 0; i < response.data.length; i++) {
                // Create a div
                var gifDiv = $('<div>');
                // Append the rating
                gifDiv.append('<p>Rating: ' + response.data[i].rating + '</p>');
                // Append the gif url
                gifDiv.append('<img src=' + response.data[i].images.fixed_width.url + '>');
                // Attach to gifs-view id and display in dom
                $('#gifs-view').prepend(gifDiv);
            }
        });
}

// Function to create and display array of buttons to dom
function renderButtons() {
    // Remove any buttons that were created after page load when page is refreshed
    $('#buttons-view').empty();
    // Loop through my array of buttons
    for (var i = 0; i < gifButtons.length; i++) {
        // Create a button element
        var buttonElement = $('<button>');
        // Add a gif class
        buttonElement.addClass('gif');
        // Add a data-name attr and give it the value of each array string
        buttonElement.attr('data-name', gifButtons[i]);
        // Add the actual string to the name of the button
        buttonElement.text(gifButtons[i]);
        // Attach to buttons-view id and display in dom
        $('#buttons-view').append(buttonElement);
    }
}

// Function to add a gif button when the add gif button is clicked
$('#add-gif').on('click', function() {
    event.preventDefault();
    // Retrieve the value of the user input
    var gifInput = $('#gif-input').val().trim();
    // Add that string to my array of buttons
    gifButtons.push(gifInput);
    // Call renderButtons function to add this button to the dom
    renderButtons();
})

// MAIN
// ==============================================================================
$(document).on('click', '.gif', displayGif);
renderButtons();