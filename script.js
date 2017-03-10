function recipe(searchq, searchAmount, searchHealth) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&to=" + searchAmount + "&" + searchHealth + "",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var x = response.hits[0].recipe.ingredientLines,
                searchRecipe = "",
                searchLabel = "",
                searchImg = "";
            for (i = 0; i < x.length; i++) {
                searchRecipe = response.hits[0].recipe.ingredientLines[i];
                $("#recipe-text").append("<h4 class='media-heading' id='recipe-label'>" + searchRecipe + "</h4>");
            }
            searchLabel = response.hits[0].recipe.label;
            $("#recipe-label").replaceWith(searchLabel);
            searchimg = response.hits[0].recipe.image;
            $("#recipe-img").attr("src", searchimg);
        }
    });
}

$("#searchhere").on("click", function () {
    var searchHealth = $("input:checked").val();
    console.log(searchHealth);
    if (typeof searchHealth === "undefined") {
        searchHealth = "";
    } else {
        searchHealth = "&health=" + searchHealth;
    }
    var searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    recipe(searchq, searchAmount, searchHealth);
});
