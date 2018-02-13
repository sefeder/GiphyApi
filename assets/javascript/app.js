var cartoons = ['Recess', 'Spongebob', 'Doug', 'Hey Arnold', 'Catdog']

$(document).ready(function () {

    $("body").on("click", "#add-cartoon", function (event) {
        event.preventDefault();
        var cartoon = $("#cartoon-input").val().trim();
        cartoons.push(cartoon);
        renderButtons();
    });
    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < cartoons.length; i++) {
            var btn = $("<button>");
            btn.addClass("cartoon-btn");
            btn.attr("data-cartoon", cartoons[i]);
            btn.text(cartoons[i]);
            $("#buttons").append(btn);
        };

    };
    renderButtons();
    



    $("body").on("click",".cartoon-btn", function () {
        var selectCartoon = $(this).attr("data-cartoon");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectCartoon + "&api_key=ZUNcGIXLV4h6Qw4f5VUBvA7buynArBZe&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
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