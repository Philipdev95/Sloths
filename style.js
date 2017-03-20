//The function below makes 
//the loading circle's height match its width.
$(window).resize(function () {
    var width = $("#loader").outerWidth();
    $("#loader").css({height: width});
});
//The function below appears not to work...
//but its not vital
$("#searchhere").click(function () {
    $("#searchhere").css({boxShadow: "0px 0px 10px 0.5px #000"});
    $("#recipe").addClass("radi-back");
});
