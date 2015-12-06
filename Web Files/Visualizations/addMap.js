mapsLoaded = 0;


function makeMapString(number) {
    mapString = '\t<p class="dragBar">...Click To Drag...  </p>\n\
    \t<div id = "mapVis' + number + 'Div" class="mapVis">\n\
    \t\t<script type="text/javascript" src="https://public.tableau.com/javascripts/api/viz_v1.js"></script>\n\
    \t\t\t<div class="tableauPlaceholder" style="width: 404px; height: 769px;">\n\
    \t\t\t\t<noscript>\n\
    \t\t\t\t\t<a href="#">\n\
    \t\t\t\t<img alt="MYO Map Dash " src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MakeYourOwn&#47;MYOMapDash&#47;1_rss.png" style="border: none" />\n\
    \t\t\t\t</a>\n\
    \t\t\t</noscript>\n\
    \t\t\t<object class="tableauViz" width="404" height="769" style="display:none;">\n\
    \t\t\t\t<param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />\n\
    \t\t\t\t<param name="site_root" value="" />\n\
    \t\t\t\t<param name="name" value="MakeYourOwn&#47;MYOMapDash" />\n\
    \t\t\t\t<param name="tabs" value="no" />\n\
    \t\t\t\t<param name="toolbar" value="yes" />\n\
    \t\t\t\t<param name="static_image" value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ma&#47;MakeYourOwn&#47;MYOMapDash&#47;1.png" />\n\
    \t\t\t\t<param name="animate_transition" value="yes" />\n\
    \t\t\t\t<param name="display_static_image" value="yes" />\n\
    \t\t\t\t<param name="display_spinner" value="yes" />\n\
    \t\t\t\t<param name="display_overlay" value="yes" />\n\
    \t\t\t\t<param name="display_count" value="yes" />\n\
    \t\t\t\t<param name="showVizHome" value="no" />\n\
    \t\t\t\t<param name="showTabs" value="y" />\n\
    \t\t\t\t<param name="bootstrapWhenNotified" value="true" />\n\
    \t\t\t</object>\n\
    \t\t</div>\n\
    \t</div>';
    return mapString;
}


function addMap() {
    mapsLoaded += 1;
    container = document.createElement('div');
    addDragFunction(container);
    container = $(container);
    container.attr('id','mapVis' + mapsLoaded + 'Container');
    container.attr('class','draggable-element');
    container.append(makeMapString(mapsLoaded));
    $('body').append(container);
}

