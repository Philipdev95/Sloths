
function recipe(searchq, searchAmount, searchhealth) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&to=" + searchAmount + searchHealth + "/",
        dataType: "json",
        error: function(response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function(response) {
            console.log(response);
            var i,
                list = "",
                x = response.hits[0].recipe.ingredientLines,
                searchRecipe = "",
                searchLabel = "",
                searchImg = "";
            for (i = 0; i < x.length; i++) {
                list = "";
                searchRecipe = response.hits[0].recipe.ingredientLines[i];
                $("#recipe-text").append("<p>" + searchRecipe + "</p>");
            }
            searchLabel = response.hits[0].recipe.label;
            $("#recipe-label").append(searchLabel);
            searchimg = response.hits[0].recipe.image;
            $("#recipe-img").attr("src", searchimg);
        }
    });
}

$("#provaq").on("click", function () {
    var searchHealth = $("input:checked").val();
    console.log(searchHealth);
    if (typeof searchHealth === "undefined") {
        searchHealth = "";
    } else {
        searchHealth = "&health=" + searchhealth;
    }
    var searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    recipe(searchq, searchAmount, searchHealth);
});

