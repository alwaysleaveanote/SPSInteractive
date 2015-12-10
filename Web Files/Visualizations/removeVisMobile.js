$( document ).ready(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    if (isMobile.matches) {
        var visDiv = $('#vis');
        visDiv.empty();
        visDiv.css("width", '100%');
        visDiv.css('text-align', "center");
        visDiv.attr('id', 'noVis');
        var notice = visDiv.append("<p>This visualization is not formatted for mobile devices.  Please use a computer to view it " +
            "or maximize your browser window.</p>");
    }
});
