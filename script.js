window.onload = function () {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0,
        key;

    for (; key = keys[i]; i++) {
        archive.push(localStorage.getItem(key));
    }
    $(".recipe").append(archive);
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
    }
};

function saveRecipe(searchimg, searchlabel, list, i) {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0,
        key;
    for (; key = keys[i]; i++) {
        archive.push(key + localStorage.getItem(key));
    };
    var q = 0;
    if (key == undefined) {
        checkifinarray(q, keys, searchimg, searchlabel, list);
    }
    for (key in keys) {
        q++;
        checkifinarray(q, keys, searchimg, searchlabel, list);
    };
};

function checkifinarray(i, keys, searchimg, searchlabel, list) {
    var n = i.toString();
    if (jQuery.inArray(n, keys) != -1) {} else {
        localStorage.setItem(i, "<div class='col-xs-12 recipe-divs media'> <div class='col-xs-4 media-right'> <a href='#'> <img class='col-xs-12 media-object recipe-img' src='" + searchimg + "' alt='img'> </a> </div> <div class='media-body'><h4 class='media-heading'>" + searchlabel + "<div class='star glyphicon glyphicon-star'</div><div class='trashbin glyphicon glyphicon-trash'></div></h4> <p>" + list + "</p> </div> </div>");
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
        searchAmount = $("#chooseamount option:selected").text();
    if (localStorage.length == 7) {
        alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!");
        return;
    }
    fullamount = Number(localStorage.length) + Number(searchAmount);
    if (fullamount > 7) {
        alert("Du kan högst visa 7 recept åt gången! Du måste radera något recept innan du söker igen!");
        return;
    }
    if (fullamount <= 7) {
        searchAmount = fullamount - localStorage.length;
        recipecount(searchq, searchAmount, searchHealth, searchDiet);
    }
});

$("#recipes").on("click", ".star", function () {
    $(".star").css("color", "yellow");
    localStorage.setItem("0", $(this).parent().parent().parent().html());
    $(this).parent().parent().parent().remove();
});

$("#recipes").on("click", ".trashbin", function () {
    $(this).parent().parent().parent().parent().remove();
    localStorage.removeItem(this.id);
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
