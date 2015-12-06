'use strict';

$(document).ready(function() {
    $(".Question").click(function() {
        var ID = $(this).attr('id')
        var ansID = '#' + ID + 'Ans';
        var arrowClass = '.' + ID + 'ToggleArrow'
        $(arrowClass).toggle();
        $(ansID).toggle();
    });

});