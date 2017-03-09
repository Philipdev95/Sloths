//Nytt api because the other one might not work
function recipe(searchq, searchAmount, searchHealth) {
    $.ajax({
        type: "GET",
        url: "http://food2fork.com/api/search",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var searchWord = "",
                searchAmount = "";
            for (i = 0; i < x.length; i++) {
                searchRecipe = response.hits[0].recipe.ingredientLines[i];
                $("#recipe-text").append("<h4 class='media-heading' id='recipe-label'>" + searchRecipe + "</h4>");
            }
            searchLabel = response.hits[0].recipe.label;
            $("#recipe-label").append(searchLabel);
            searchimg = response.hits[0].recipe.image;
            $("#recipe-img").attr("src", searchimg);
        }
    });
}