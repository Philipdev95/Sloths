function recipe(searchq, searchamount, searchHealth) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&to=" + searchamount + searchHealth + "/",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var i,
                list = "",
                x = response.hits[0].recipe.ingredientLines,
                searchrecipe = "",
                searchlabel = "",
                searchimg = "";
            for (i = 0; i < x.length; i++) {
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
        searchamount = $("#chooseamount option:selected").text();
    recipe(searchq, searchamount, searchHealth);
});