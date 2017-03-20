window.onload = function () {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push(localStorage.getItem(key));
    }
    $(".recipe").append(archive);
};

function localstoragelength(){
    var q = 0;
    for (var key in localStorage){
        var recipe = localStorage.getItem(q);
        q++;
    }
    return q;
};

function printRecipe(response) {
    storageamount = localstoragelength();
    var all_list = "",
        y = response.hits;
	for (i = 0; i < y.length; i++) {
		searchlabel = response.hits[i].recipe.label;
		searchimg = response.hits[i].recipe.image;
        var p,
            list = "",
            x = response.hits[i].recipe.ingredientLines;
        for (p = 0; p < x.length; p++) {
            var searchrecipe = response.hits[i].recipe.ingredientLines[p];
            list += "<p>" + searchrecipe + "</p>";
        }
        saveRecipe(searchimg, searchlabel, list, i);
	}
    for (var key in localStorage){
        var recipe = localStorage.getItem(storageamount);
        storageamount++;
        $(".recipe").append(recipe);
    };
    console.log("loopen körs: " + i + "gånger.");
    };

function saveRecipe(searchimg, searchlabel, list, i) {
    var u = 0;
    for(var key in localStorage){
        u++;
    }
    if (u >= 7){
        u=6;
    }
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;
    for (; key = keys[i]; i++) {
        archive.push( key + localStorage.getItem(key));
    };
    var q = 0;
    if (key == undefined){
        localStorage.setItem(q, "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "<div id=" + q + " class='trashbin glyphicon glyphicon-trash'></div></h4> <p>" + list + "</p> </div> </div>");
    }
    for (key in keys){
        q++;
        checkifinarray(q, keys, searchimg, searchlabel, list);
    };
};

function checkifinarray(i, keys, searchimg, searchlabel, list){
    var n = i.toString();
    if(jQuery.inArray(n, keys) != -1) {
    } else {
        localStorage.setItem(i, "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "<div id=" + i + " class='trashbin glyphicon glyphicon-trash'></div></h4> <p>" + list + "</p> </div> </div>");
    }
};

function random(response, searchAmount) {
	var count = response.count;
	if(count == 0){
		alert("Det fanns inga recept som matchade din sökning! Prova att ändra sökningen!");
	}
	if(count != 0 & count < searchAmount){
		alert("Det fanns inte så många recept som du ville ha!");
	}
	var number = 1 + Math.floor(Math.random() * count);
	parseInt(number);
    console.log(number);
    if (number >= count) {
        number = number - 7;
		console.log(number);
    }
	return number;
};

function recipecount(searchq, searchAmount, searchHealth, searchDiet) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + searchHealth + searchDiet,
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
			$("#loader").css("display", "block");
            searchFrom = random(response, searchAmount);
            searchTo = parseInt(searchFrom) + parseInt(searchAmount);
            recipe(searchq, searchFrom, searchTo, searchHealth, searchDiet, searchAmount);
		}
    });
};

function recipe(searchq, searchFrom, searchTo, searchHealth, searchDiet, searchAmount) {
    $.ajax({
        type: "GET",
        url: "https://api.edamam.com/search?q=" + searchq + "&from=" + searchFrom + "&to=" + searchTo + searchHealth + searchDiet,
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
			printRecipe(response);
			$("#loader").css("display", "none");
        }
    });
};

function storeLimit(){
	if(localStorage.length == 7){
		alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!");
	}
};

$("#searchhere").on("click", function () {
	storeLimit();
    var searchHealth = health_label(),
        searchDiet = diet_label(),
        searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text();
    recipecount(searchq, searchAmount, searchHealth, searchDiet);
});
    

$("#recipes").on("click", ".trashbin", function () {
    localStorage.removeItem(this.id);
    $(this).parent().parent().parent().remove();
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
};

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
};