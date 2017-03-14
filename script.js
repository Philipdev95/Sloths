function printRecipe(response, searchAmount, list) {
	console.log(searchAmount);
	for (i = 0; i < searchAmount.length; i++) {
		//$("#recipe-text").html(list);
		searchlabel = response.hits[i].recipe.label;
		//$("#recipe-label").html(searchlabel);
		searchimg = response.hits[i].recipe.image;
		//$("#recipe-img").attr("src", searchimg);
        
        $(".recipe").append("<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "</h4> <p>" + list + "</p> </div> </div>"
            );
	}
    console.log("loopen körs: " + i + "gånger.");
}

function random(response, searchAmount){
	var count = response.count;
	console.log(count);
	var number = 1 + Math.floor(Math.random() * count);
    number = 999;
    console.log(number);
    if (number >= 993){
        number = number - 7;//kanske fixar senare
    };
	console.log(number);
	return number;
}

function recipecount(searchq, searchAmount, searchHealth, searchDiet) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + searchHealth + searchDiet,
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            searchFrom = random(response);
            console.log(response);
            searchTo = parseInt(searchFrom) + parseInt(searchAmount);
            recipe(searchq, searchFrom, searchTo, searchHealth, searchDiet, searchAmount);
        }
    });
}

function recipe(searchq, searchFrom, searchTo, searchHealth, searchDiet, searchAmount) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&from=" + searchFrom + "&to=" + searchTo + searchHealth + searchDiet,
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
                var searchrecipe = response.hits[0].recipe.ingredientLines[i];
                list += "<p>" + searchrecipe + "</p>";
            }
			printRecipe(response, searchAmount, list);
        }
    });
}

$("#searchhere").on("click", function () {
    var searchHealth = health_label(),
        searchDiet = diet_label(),
        searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    console.log(searchHealth);
    console.log(searchDiet);
    recipecount(searchq, searchAmount, searchHealth, searchDiet);
});

function health_label() {
    health_labels = $(".health_label:checked").map(function () {
        return this.value;
    }).get().join(",%20");
    if (health_labels === "") {
        health_labels = "";
    } else {
        health_labels = "&health=" + health_labels;
    }
    return health_labels;
}

function diet_label() {
    var diet_labels = $(".diet_label:checked").map(function () {
        return this.value;
    }).get().join(",%20");
    if (diet_labels === "") {
        diet_labels = "";
    } else {
        diet_labels = "&diet=" + diet_labels;
    }
    return diet_labels;
}