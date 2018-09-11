
// GLOBAL VARIABLES AND ARRAYS
// ==============================================================================
// Array of gif buttons
var gifButtons = ['Tiger Woods', 'Lebron James', 'Aaron Judge', 'Odell Beckham', 'Serena Williams', 'Tony Hawk'];

// FUNCTIONS
// ==============================================================================
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
$('#add-gif').on('click', function(event) {
    // This function will stop the entire page from refreshing
    event.preventDefault();
    // Retrieve the value of the user input
    var gifInput = $('#gif-input').val().trim();
    // Add the user input to my array of buttons
    gifButtons.push(gifInput);
    // Call renderButtons function to add this button to the dom
    renderButtons();
    // Empty input field after user submits
    $('#gif-input').val('');
})

// Function to display gif and info
function displayGif() {
    // Remove any gifs that have previously been loaded
    $('#gifs-view').empty();
    // Retrieve the value of data-name that is associated with each button
    var gif = $(this).attr('data-name');
    // Build url using Giphy API documentation
    // Set the limit parameter to 10 and the rating parameter to 'g'
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&limit=10&rating=g&rating=pg&api_key=6aBA6hxDJKQttqlFkPei1tttwWWjxv2p';
    console.log(queryURL);
    // Create AJAX call for the specific gif button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        // Loop through JSON and retrieve the rating and gif url for all 10 results
        for (var i = 0; i < response.data.length; i++) {
            // Create div element
            var gifSpan = $('<span>');
            // Append gif metadata
            gifSpan.append('<p>Title: ' + response.data[i].title + '</p>')
            gifSpan.append('<p>Rating: ' + response.data[i].rating + '</p>');
            // Create img element
            var gifImg = $('<img>');
            // Add src attr to hold still img url
            gifImg.attr('src', response.data[i].images.fixed_height.url);
            // Add data-still attr to hold still img url
            gifImg.attr('data-still', response.data[i].images.fixed_height_still.url);
            // Add data-animate attr to hold moving img url
            gifImg.attr('data-animate', response.data[i].images.fixed_height.url);
            // Add data-state attr to toggle between still and animate
            gifImg.attr('data-state', 'animate');
            // Add a gif class
            gifImg.attr('id', 'gif');
            // Append image to span element
            gifSpan.append(gifImg);              
            // Attach the rating and img elements to gifs-view id and display in dom
            $('#gifs-view').prepend(gifSpan);
        }    
    });    
}

// LISTENERS
// ==============================================================================
// Function to toggle between still and animate states when user clicks on gif image
$(document).on('click', '#gif', function() {
    // Retrieve the value that is currently stored in the data-state attr
    var state = $(this).attr('data-state');
    console.log(state);
    // If/else statements to toggle between still and animate states
    // If the current state is 'still' - change the values to animate upon click
    if (state === 'still') {
        // Toggle the src attr to the animate url
        $(this).attr('src', $(this).attr('data-animate'))
        // Toggle the data-state attr to animate
        $(this).attr('data-state', 'animate')
    }
    // If the current state is 'animate' - change the values back to still upon click
    else if (state === 'animate') {
        // Toggle the src attr to the still url
        $(this).attr('src', $(this).attr('data-still'))
        // Toggle the data-state attr to still
        $(this).attr('data-state', 'still');
    }   
})

// Function that will respond to our dynamically created buttons with class of gif
$(document).on('click', '.gif', displayGif);
renderButtons();