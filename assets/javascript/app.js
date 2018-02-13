
// create a global variable that is an array with the starting buttons on it
var cartoons = ['Recess', 'Spongebob', 'Doug', 'Hey Arnold', 'Catdog']

$(document).ready(function () {
// this function takes the user's input and adds it to the array above then renders buttons for each element in the array. it also clears the input once the submit button is clicked
    $("body").on("click", "#add-cartoon", function (event) {
        event.preventDefault();
        var cartoon = $("#cartoon-input").val().trim();
        cartoons.push(cartoon);
        $('#cartoon-input').val('');
        renderButtons();
    });
// this function allows the users to clear the buttons they've added
    $("body").on("click", "#clear-cartoon", function (event) {
        event.preventDefault();
        cartoons = ['Recess', 'Spongebob', 'Doug', 'Hey Arnold', 'Catdog'];
        renderButtons();
    });

  //this function uses a forloop to go through the array element by element and add each to a a button and append the button to the page  
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < cartoons.length; i++) {
            var btn = $("<button>");
            btn.addClass("cartoon-btn btn btn-primary");
            btn.attr("data-cartoon", cartoons[i]);
            btn.text(cartoons[i]);
            $("#buttons").append(btn);
        };

    };
    renderButtons();
// This function allows the user to click on one of the cartoon buttons and makes an ajax request to giphy's api inputing the text of the button they clicked to the url in the request 
    $("body").on("click",".cartoon-btn", function () {
        var selectCartoon = $(this).attr("data-cartoon");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectCartoon + "&api_key=ZUNcGIXLV4h6Qw4f5VUBvA7buynArBZe&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
  // in this function the results of the api request (10 gifs) are loaded to the page      
            .then(function (response) {
                var results = response.data;
                $("#gifs-appear-here").empty();

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);
                  
                    var cartoonImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
                    cartoonImage.attr('data-state', 'still');
                    cartoonImage.addClass('gif');
                    cartoonImage.attr('data-still',results[i].images.fixed_height_still.url);
                    cartoonImage.attr('data-animate', results[i].images.fixed_height.url);
                    gifDiv.prepend(cartoonImage);
                    gifDiv.prepend(p);
                    $("#gifs-appear-here").prepend(gifDiv);
                };
           // this function allows the user to click on the gif and switch it from its still state to its animated state and back. Both states are given in the api response.
                $(".gif").on("click", function() {
                    var state = $(this).attr('data-state');
                    if (state === "still") {
                        $(this).attr('src',$(this).attr('data-animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src',$(this).attr('data-still'));
                        $(this).attr('data-state', 'still');
                    }
                });
          });
    });
});