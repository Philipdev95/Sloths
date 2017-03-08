$("#searchButton").on("click", function () {
    var text = $("#search").val()
    $("#searchButton").html("Din mamma kan va en " + text + "!");
});