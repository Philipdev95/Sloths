$("#searchButton").on("click", function () {
    var text = $("#search").val()
    $("#searchButton").html("Din mamma kan va en " + text + "!");
});

function recipe(searchq, searchamount, searchhealth) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&to=" + searchamount + searchhealth + "",
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
    searchhealth = $("input:checked").val();
    console.log(searchhealth);
    if (typeof searchhealth === "undefined"){
        searchhealth = "";
    }
    else{
        searchhealth = "&health=" + searchhealth;
    };
    searchq = $("#search").val();
    searchamount = $("#chooseamount option:selected").text();
    recipe(searchq, searchamount, searchhealth);
});