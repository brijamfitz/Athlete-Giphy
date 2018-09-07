
// GLOBAL VARIABLES AND ARRAYS
// ==============================================================================
// Array of gif buttons
var gifButtons = ['Tiger Woods', 'Lebron James', 'Aaron Judge', 'Michael Jordan', 'Lewis Hamilton', 'Phil Mickelson', 'Bryce Harper'];

// FUNCTIONS
// ==============================================================================
// Function to display gif and info
function displayGif() {
    var gif = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&limit=10&rating=g&api_key=6aBA6hxDJKQttqlFkPei1tttwWWjxv2p';
        console.log(queryURL);

        // Creates AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: 'GET'
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var gifDiv = $('<div>');
                gifDiv.append('<p>Rating: ' + response.data[i].rating + '</p>');
                gifDiv.append('<img src=' + response.data[i].images.fixed_width.url + '>');
                $('#gifs-view').prepend(gifDiv);
            }
        });
}

// Function to create and display array of buttons to dom
function renderButtons() {
    $('#buttons-view').empty();

    for (var i = 0; i < gifButtons.length; i++) {
        var buttonElement = $('<button>');
        buttonElement.addClass('gif');
        buttonElement.attr('data-name', gifButtons[i]);
        buttonElement.text(gifButtons[i]);
        $('#buttons-view').append(buttonElement);
    }
}

// Function to add a gif button when the add gif button is clicked
$('#add-gif').on('click', function() {
    event.preventDefault();
    var gifInput = $('#gif-input').val().trim();
    gifButtons.push(gifInput);
    renderButtons();
})

// MAIN
// ==============================================================================
$(document).on('click', ".gif", displayGif);
renderButtons();