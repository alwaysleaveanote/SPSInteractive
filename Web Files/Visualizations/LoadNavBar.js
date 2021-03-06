'use strict';

var navBarText = "<header>\n\
\t<div id='title'>\n\
\t\t<h1><a href='../index.html'>SPSInteractive</a></h1>\n\
\t</div>\n\
\t<nav>\n\
\t\t<ul>\n\
\t\t\t<li><a href='../index.html'><p>Home</p></a></li>\n\
\t\t\t<li><a href='../Explore.html'><p>Explore Topics <span class='glyphicon glyphicon-chevron-down'></span></p></a>\n\
\t\t\t\t<ul>\n\
\t\t\t\t\t<li><p>About the School <span class='glyphicon glyphicon-chevron-right'></span></p>\n\
\t\t\t\t\t\t<ul>\n\
\t\t\t\t\t\t\t<li><a href='SchoolSize.html'>School Size</a></li>\n\
\t\t\t\t\t\t\t<li><a href='APIB.html'>AP & IB Courses</a></li>\n\
\t\t\t\t\t\t\t<li><a href='AttendanceZones.html'>School Boundaries</a></li>\n\
\t\t\t\t\t\t</ul>\n\
\t\t\t\t\t</li>\n\
\t\t\t\t\t<li><p>About the Students <span class='glyphicon glyphicon-chevron-right'></span></p>\n\
\t\t\t\t\t\t<ul>\n\
\t\t\t\t\t\t\t<li><a href='College.html'>Graduates Enrolled in College</a></li>\n\
\t\t\t\t\t\t\t<li><a href='Demographics.html'>Demographics</a></li>\n\
\t\t\t\t\t\t\t<li><a href='ELL.html'>English Language Learners</a></li>\n\
\t\t\t\t\t\t\t<li><a href='FRPL.html'>Free and Reduced Price Lunch</a></li>\n\
\t\t\t\t\t\t</ul>\n\
\t\t\t\t\t</li>\n\
\t\t\t\t\t<li><p>About the Academics <span class='glyphicon glyphicon-chevron-right'></span></p>\n\
\t\t\t\t\t\t<ul>\n\
\t\t\t\t\t\t\t<li><a href='TestScoresInDepth.html'>Test Scores</a></li>\n\
\t\t\t\t\t\t</ul>\n\
\t\t\t\t\t</li>\n\
\t\t\t\t\t<li><p>Miscellaneous <span class='glyphicon glyphicon-chevron-right'></span></p>\n\
\t\t\t\t\t\t<ul>\n\
\t\t\t\t\t\t\t<li><a href='POI.html'>Nearby Services</a></li>\n\
\t\t\t\t\t\t\t<li><a href='HomePrices.html'>Housing Prices</a></li>\n\
\t\t\t\t\t\t</ul>\n\
\t\t\t\t\t</li>\n\
\t\t\t\t</ul>\n\
\t\t\t</li>\n\
\t\t\t<li><a href='MYO.html'><p>Make your Own</p></a></li>\n\
\t\t\t<li><a href='../FAQ.html'><p>FAQs</p></a></li>\n\
\t\t\t<li><a href='../ContactMe.html'><p>Contact Me</p></a></li>\n\
\t\t</ul>\n\
\t</nav>\n\
</header>";

$(document).ready(function() {
    $("body").prepend(navBarText)
});
