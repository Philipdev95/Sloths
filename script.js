window.onload = function () {
    var o = 0;
    for (var key in localStorage){
        var recipe = localStorage.getItem(o);
        o++;
        $(".recipe").append(recipe);
    }
};
function printRecipe(response) {
	console.log(response);
    var all_list = "",
        y = response.hits;
	for (i = 0; i < y.length; i++) {
		searchlabel = response.hits[i].recipe.label;
		searchimg = response.hits[i].recipe.image;
        console.log(i);
        var p,
            list = "",
            x = response.hits[i].recipe.ingredientLines;
        for (p = 0; p < x.length; p++) {
            var searchrecipe = response.hits[i].recipe.ingredientLines[p];
            list += "<p>" + searchrecipe + "</p>";
        }
        all_list +=  "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "</h4> <p>" + list + "</p> </div> </div>";
        saveRecipe(searchimg, searchlabel, list, i);
	}
    $(".recipe").append(all_list);
    console.log("loopen körs: " + i + "gånger.");
}
function saveRecipe(searchimg, searchlabel, list, i) {
    localStorage.setItem(i, "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "</h4> <p>" + list + "</p> </div> </div>");
}

function random(response, searchAmount) {
	var count = response.count;
	console.log(count);
	var number = 1 + Math.floor(Math.random() * count);
    console.log(number);
    if (number >= 993) {
        number = number - 7;//kanske fixar senare
    }
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
			printRecipe(response);
        }
    });
}

function storeLimit(){
	if(key in localStorage == 7){
		alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!")
	}
}

$("#searchhere").on("click", function () {
    var searchHealth = health_label(),
        searchDiet = diet_label(),
        searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    recipecount(searchq, searchAmount, searchHealth, searchDiet);
});

function health_label() {
    health_labels = $(".health_label:checked").map(function () {
        return this.value;
    }).get().join(",");
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
    }).get().join(",");
    if (diet_labels === "") {
        diet_labels = "";
    } else {
        diet_labels = "&diet=" + diet_labels;
    }
    return diet_labels;
}