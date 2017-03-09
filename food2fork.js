//Nytt api because the other one might not work
function recipe() {
    $.ajax({
        type: "GET",
        url: "http://food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var searchWord = "",
                searchAmount = ""; 
            
            $("#recipe-div").append("<h4 class='media-heading' id='recipe-label'>" +  + "</h4>");
        }
    });
}