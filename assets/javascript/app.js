// Array of buttons
var gifButtons = ['button', 'button', 'button', 'button', 'button', 'button', 'button', 'button', 'button', 'button'];

// Function to display gif and info
function displayGif() {

}

// Function to create and display array of buttons to dom
function renderButtons() {
    $('#buttons').empty();

    for (var i = 0; i < gifButtons.length; i++) {
        var buttonElement = $('<button>');
        buttonElement.addClass('gif');
        buttonElement.attr('data-name', gifButtons[i]);
        buttonElement.text(gifButtons[i]);
        $('#buttons').append(buttonElement);
}
}

// Function to add a gif button when the add gif button is clicked
function addGif() {

}