$("#searchButton").on("click", function () {
    var text = $("#search").val()
    $("#searchButton").html("Din mamma kan va en " + text + "!");
});

function recipe() {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=chicken",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
        }
    });
};

recipe()