window.onload = function () {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0,
        key;

    for (; key = keys[i]; i++) {
        archive.push(localStorage.getItem(key));
    }
    $("#favorites").append(archive);
};

function localstoragelength() {
    var q = 0;
    for (var key in localStorage) {
        var recipe = localStorage.getItem(q);
        q++;
    }
    return q;
};

function printRecipe(response) {
    storageamount = localstoragelength();
    var y = response.hits;
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
        $(".recipe").append("<div class='col-xs-12 recipe-divs media'><div class='col-xs-12 col-sm-4 media-right'> <a href='#'> <img class='col-xs-10 col-xs-push-0.5 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "<div class='star glyphicon glyphicon-star'></div><div class='trashbin glyphicon glyphicon-trash'></div></h4><p>" + list + "</p> </div> </div>");
    }
};

function saveRecipe(saved_recipe) {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0,
        key;
    for (; key = keys[i]; i++) {
        archive.push(key + localStorage.getItem(key));
    };
    var q = 0;
    if (key == undefined) {
        checkifinarray(q, keys, saved_recipe);
    }
    for (key in keys) {
        q++;
        checkifinarray(q, keys, saved_recipe);
    };
};

function checkifinarray(i, keys, saved_recipe) {
    var n = i.toString();
    if (jQuery.inArray(n, keys) != -1) {} else {
        localStorage.setItem(i, "<div class='col-xs-12 favorite-divs media' id=" + i + ">" + saved_recipe + "</div>");
    }
};

function random(response, searchAmount) {
    var count = response.count;
    if (count == 0) {
        alert("Det fanns inga recept som matchade din sökning! Prova att ändra sökningen!");
        return "notWorking";
    }
    if (count != 0 & count < searchAmount) {
        alert("Det fanns inte så många recept som du ville ha!");
        return "notWorking";
    } else {
        var number = 1 + Math.floor(Math.random() * count);
        parseInt(number);
        if (number >= count) {
            number = number - 7;
        }
        return number;
    }
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
            searchFrom = random(response, searchAmount);
            if (searchFrom == "notWorking") {

            } else {
                $("#loader").css("display", "block");
                searchTo = parseInt(searchFrom) + parseInt(searchAmount);
                recipe(searchq, searchFrom, searchTo, searchHealth, searchDiet, searchAmount);
            }
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
            console.log(response);
        }
    });
};

$("#searchhere").on("click", function () {
    var searchHealth = health_label(),
        searchDiet = diet_label(),
        searchq = $("#search").val(),
        searchAmount = $("#chooseamount option:selected").text(),
        recipedivs = $(".recipe-divs").length - 1;
    if ($(".recipe-divs").length == 7) {
        alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!");
        return;
    }
    fullamount = Number(recipedivs) + Number(searchAmount);
    if (fullamount > 7) {
        alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!");
        return;
    }
    if (fullamount <= 7) {
        searchAmount = fullamount - recipedivs;
        recipecount(searchq, searchAmount, searchHealth, searchDiet);
    }
});

$("#recipes").on("click", ".star", function () {
    saving_recipe = $(this).parent().parent().html();
    console.log(saving_recipe);
    saving_recipe = saving_recipe.replace("<div class='star glyphicon glyphicon-star'></div>", "");
    console.log(saving_recipe);
    saveRecipe(saving_recipe);
    $(this).parent().parent().parent().remove();
});

$("#favorites").on("click", ".trashbin", function () {
    $(this).parent().parent().parent().parent().remove();
    htmlvalue = $(this).closest('.favorite-divs').attr('id');
    localStorage.removeItem(htmlvalue);
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
