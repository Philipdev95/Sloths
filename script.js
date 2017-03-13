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
            var i;
            var list = "";
            var x = response.hits[0].recipe.ingredientLines;
            for (i = 0; i < x.length; i++){
                searchrecipe = response.hits[0].recipe.ingredientLines[i];
                list += "<p>" + searchrecipe + "</p>";
            }
			printRecipe(response, searchAmount, list)
        }
    });
}

function printRecipe(response, searchAmount, list){
	console.log(searchAmount)
	for(i = 0; i < searchAmount.length; i++){
		$("#recipe-text").html(list);
		searchlabel = response.hits[0].recipe.label;
		$("#recipe-label").html(searchlabel);
		searchimg = response.hits[0].recipe.image;
		$("#recipe-img").attr("src", searchimg);
	}
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
    diet_health();
});

function diet_health() {
    if ($('#gluten-free').is(":checked"))
        {
            console.log("test");
        }
    else{
        console.log("ej test");
    }
}