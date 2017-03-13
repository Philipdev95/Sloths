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
            var i,
                list = "",
                x = response.hits[0].recipe.ingredientLines;
            for (i = 0; i < x.length; i++) {
                searchrecipe = response.hits[0].recipe.ingredientLines[i];
                list += "<p>" + searchrecipe + "</p>";
            }
			printRecipe(response, searchAmount, list);
        }
    });
}

function printRecipe(response, searchAmount, list){
	console.log(searchAmount);
	for(i = 0; i < searchAmount.length; i++){
		//$("#recipe-text").html(list);
		searchlabel = response.hits[i].recipe.label;
		//$("#recipe-label").html(searchlabel);
		searchimg = response.hits[i].recipe.image;
		//$("#recipe-img").attr("src", searchimg);
        
        $(".recipe").append(
        "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "</h4> <p>" + list + "</p> </div> </div>"
                       );
        alert(i);
	}
    console.log(i);
}

$("#searchhere").on("click", function () {
    var searchHealth = health_label(),
        searchDiet = diet_label(),
        searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    console.log(searchHealth);
    console.log(searchDiet);
    recipe(searchq, searchAmount, searchHealth);
});

function health_label() {
    health_labels = $(".health_label:checked").map(function () {
        return this.value;
    }).get().join('%20');
    if (health_labels == "") {
        health_labels = "";
    } else {
        health_labels = "&health=" + health_labels;
    }
    return health_labels;
}

function diet_label() {
    diet_labels = $(".diet_label:checked").map(function () {
        return this.value;
    }).get().join('%20');
    if (diet_labels == "") {
        diet_labels = "";
    } else {
        diet_labels = "&diet=" + diet_labels;
    }
    return diet_labels;
}