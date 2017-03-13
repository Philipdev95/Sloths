function recipe(searchq, searchAmount, searchHealth, searchDiet) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&to=" + searchAmount + searchHealth + searchDiet + "",
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
    var searchHealth = health_label();
    console.log(searchHealth);
    var searchDiet = diet_label();
    console.log(searchDiet);
    var searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    recipe(searchq, searchAmount, searchHealth, searchDiet);
});

function health_label() {
    health_labels = $(".health_label:checked").map(function(){
        return this.value;
    }).get().join(',%20');
    if (health_labels == "") {
        health_labels = "";
    } else {
        health_labels = "&health=" + health_labels;
    }
    return health_labels;
}

function diet_label() {
    diet_labels = $(".diet_label:checked").map(function(){
        return this.value;
    }).get().join(',%20');
    if (diet_labels == "") {
        diet_labels = "";
    } else {
        diet_labels = "&diet=" + diet_labels;
    }
    return diet_labels;
}