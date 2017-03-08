$("#searchButton").on("click", function () {
    var text = $("#search").val()
    $("#searchButton").html("Din mamma kan va en " + text + "!");
});

function recipe(searchq) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var i;
            var list = "";
            var x = response.hits[0].recipe.ingredientLines;
            for (i = 0; i < x.length; i++){
                list = "";
                searchrecipe = response.hits[0].recipe.ingredientLines[i];
                $("#recipe-text").append("<p>" + searchrecipe + "</p>");
            }
            searchlabel = response.hits[0].recipe.label;
            $("#recipe-label").append(searchlabel);
            searchimg = response.hits[0].recipe.image;
            $("#recipe-img").attr("src", searchimg);
        }
    });
};

$("#provaq").on("click", function(){
    searchq = $("#search").val();
    recipe(searchq);
});