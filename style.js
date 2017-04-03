//The function below makes 
//the loading circle's height match its width.
/*
$("#searchhere").click(function () {
    var width = $("#loader").outerWidth();
    $("#loader").css({height: width});
});
*/
//The function below appears not to work...
//but its not vital
$("#searchhere").click(function () {
    $("#searchhere").css({
        boxShadow: "0px 0px 10px 0.5px #000"
    });
    $("#recipe").addClass("radi-back");
});

$("#latest").click(function () {
    $("#latest").addClass("active").removeClass("tabs");
    $("#favo").addClass("tabs").removeClass("active");
    $("#recipes").css({
        display: "block"
    });
    $("#favorites").css({
        display: "none"
    });
});
$("#favo").click(function () {
    $("#favo").addClass("active").removeClass("tabs");
    $("#latest").addClass("tabs").removeClass("active");
    $("#recipes").css({
        display: "none"
    });
    $("#favorites").css({
        display: "block"
    });
});
