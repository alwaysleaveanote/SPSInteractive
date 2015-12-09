# SPSInteractive
This repo contains all the files I used to create [SPSInteractive](SPSInteractive.azurewebsites.net) plus a guide to recreating it with your own data

##How To
This section goes over how I created this tool and gives tips on how you can create your own

###The Data
####Getting the Data
#####Basics
Unfortunately, every state in the country has its' own government agency in charge of providing information, resources, and technical assistance for education related matters.  This means that there is no one-size-fits-all approach to gathering datasets from  different states, or even a way to gather the same datasets from each state. 

In Washington, our education agency, [OSPI](http://data.k12.wa.us:9990/PublicDWP/Web/WashingtonWeb/Home.aspx?appid=448), makes all their datasets accessible through a (so slow as to be virtually unusable) collection of datasets, which you can filter at the year,school district, and school levels, and then download in CSV form.  Roadblocks aside, they do have a huge number of (more-or-less) clean datasets on a lot of really useful topics such as Demographics, Free or Reduced Priced Lunch, Test Scores, and English as a Second Language students.  

I'm not sure if the agencies in other states have similar tools, but you can find your state's agency on [Wikipedia](https://en.wikipedia.org/wiki/State_education_agency), then Google their website and explore it.  If they do have a way to download data, just choose the datasets you are interested in and go for it.  If not (or if you don't want to go through the hassle of interacting with their site) you should be able to email them directly and ask for datasets, which you can then filter on your own.  I've included a list of all the datasets I used as a starting point for you.

```
*Standardized Test Scores
  *Reading
  *Writing
  *Science
  *Math
*AP and IB Enrollemnt (these are special curriculums Washington schools offer.  I'm not sure if they're offered in other states)
*Class Sizes
*College Enrollment Within 1 Year of Graduation (only for high schools)
*Average Daily Attendance
*Demographic Breakdown
*Dropout Rates
*English as a Second Language Students
*Free or Reduced Price Lunch
*School Directory (should contain school names, grades, and addresses)
*Graduation Rates (only for high schools)
*Special Ed
*Shapefiles of Attendance Zones (certain cities allow students who live in a specific area to only attend specific schools)
```

Simply tracking down and getting my hands on all of these datasets was perhaps the most time consuming and frustrating part of this project - hopefully this information will help you get it done faster.  Do some research beforehand to find the best way to get the data.  Also, see if your state has any special programs you should gather data on.

#####Roadblocks I faced
One of the biggest problems I had in getting the data was that the OSPI tool requires you to download separate datasets for each school year and each grade level, which meant that I had to download and combine literally hundreds of datasets by hand.  This, combined with extremely slow filtering and downloading, made this process excruciating.  Don't be stupid like me.  These agencies more than likely have all the years and grades for any particular dataset already combined and saved on their own servers.  Email them and ask for the files directly!    

Another problem I had was that not all of the datasets I wanted were on the OSPI website.  In Seattle, schools publish a "report card" every year with information about average class sizes, attendance rates, etc. Unfortunately, this data isn't isn't in the OSPI database, and there is no convenient repository from which to get it all.  Instead, each of these reports is hosted on a separate page.  If this happens to you **Email the school district**.  If that doesn't work, and you really need the data, you're just going to have to do it the hard way: by hand or by web scraper.  

####Cleaning the Data
#####Basic Process
Once you have all the datasets, odds are they're too dirty to do anything with.  There are too many possible errors for me to go over, but I'll include the process I went through to clean my data, as well as some of the trickiest things I encountered

1. Combine all similar datasets.  The first thing you should do after you finish getting all your datasets is combine similar ones.  If, like me, you have a different dataset for each grade and school year, this can be a long, arduous process.  Sorry.  Watching Netflix while you copy and paste all the similar datasets into one master dataset makes it a little bit more bearable.  If you took my advice and emailed the agency directly, congratulations you saved yourself hours of drudgery. Or cost yourself hours of Netflix.  Depends on how you look at it.
2. Now duplicate these master datasets and save one copy in a separate folder.  This isn't strictly necessary, but you'll be glad you did it if you mess up the cleaning process and need to revert to an earlier version.
3. Finally, it's time to start cleaning.  First, go through each of the master datasets (note that these are not the master datasets you saved in a separate folder, but rather the duplicates) and take out any fields you aren't interested in.  Use your best judgement on which fields to delete - you can always restore them from the master copies later - but having 20 different fields for each dataset can make the visualization tool you use (I used Tableau) crowded and hard to navigate.  
  1. Don't delete unique identifiers such as School Codes.  These can be really useful if the actual names for these entities vary slightly across your datasets (which shouldn't happen, but it does).
4. Make field names easy to understand.  If a field has a name that you wouldn't immediately recognize, or one that is unnecessarily long, change it to something better.  This'll make your life a lot easier later. 
5. Normalize field names.  Make sure any fields that your various master datasets have in common (ie school names, school years, etc.) have the same name.  This will make it a lot easier to link the various files in your visualization tool.
6. Get the latitude and longitude values for the school's addresses using a tool like [Batch Geocode](http://www.findlatitudeandlongitude.com/batch-geocode/#.VmTOOfmDGko) and add them to your directory dataset.
7. Create "joining" datasets.  All of the visualization tools I've come across link disparate dataset using connections fields both datasets have in common, allowing data from both of these sets to be used on one visualization.  Having a central datasets which all your datasets can link to makes everything a lot simpler.  In my joining dataset, I included School Name, school type, lowest grade level (*important!*), highest grade level (*important!*), and the name of the grade range (ie elementary school, k-8 school, etc.).  [Here](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Datafiles/General.xlsx) is the dataset I used.  Note that you may have to add fields to this if your project varies from mine - for example, if you use a school ID rather than a school name to identify schools, you will have to include a SchoolID field in your joining dataset.  
  1. I never use the School Type or Grade Range Name fields throughout my project.  You can leave them in if you think you will use them, but it is not necessary.  
  2. I also had a [JOIN ON](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Datafiles/JOIN%20ON.xlsx) dataset which I used throughout my project.  In hidsight, though, I never used this set for anything that my other joining dataset couldn't handle, so you shouldn't create this dataset.   Keep this in mind if you look at my Tableau files.   
  3. If this doesn't make sense to you yet, don't worry.  It'll make a lot more sense once we begin visualizing


#####Things to Watch Out For
1. Schools can close from year to year.  If you want to create a tool which only shows schools that are currently in business, make sure that you obtain an up to date directory, and use only the schools in this directory when creating your joining datasets.  If you use this joining dataset as the primary dataset for each of your visualizations (more on that later), this will cause the visualization to only show schools that are currently in business, even if your master datasets contain entries for schools that are closed.

####Special Datasets
Shapefiles:  In Seattle, each school has a specific attendance zone.  If a student doesn't live within this zone, they have to get special permission to attend the school.   I wanted to visualize these zones, so I obtained shapefiles of all of the attendance zones.  Tableau is not compatible with these types of files, though, so I had to use [QGIS](http://www.qgis.org/en/site/) to transform these shapefiles into polygon files, which Tableau is compatible with.  [This](https://community.tableau.com/docs/DOC-5831) is a great guide on how to do that.


###The Visualization
For the actual visualization portion of my project, I used [Tableau Public](https://public.tableau.com/s/).  There are plenty of [getting started guides](http://www.tableau.com/beginners-data-visualization) out there for Tableau, so I'll only briefly go over the steps I went through to make my worksheets and dashboards.  I'll also  talk a little bit about some of the tricker hacks and work-arounds I did to make both the worksheets and dashboards user friendly.

####Worksheets
In tableau, there are two types of visualizations: Worksheets and Dashboards.  Worksheets are essentially the content of a visualization while dashboards are the formatting, and as such, you must create your worksheets before you create your dashboards.

#####Basic Steps
1. [Load your master datasets](http://www.tableau.com/learn/tutorials/on-demand/connecting-excel-csv-and-text-files?signin=1939c4930fa0d531f77079da955c3fd1) and [create relationships](http://onlinehelp.tableau.com/current/pro/online/windows/en-us/multipleconnections_relationships.html) between all your datasets.
  1. The only relationships which are strictly necessary are those between your master datasets and your joining dataset, but the more relationships the merrier.
  2. If you correctly normalized the names of similar fields between your master datasets, these relationships should automatically be created.  It's always good to double check this, though.
2. Make sure the data types and formats for each field are correct, determine which fields in each dataset should be measures and which should be dimensions, and make sure that the aggregation format for each dimension is correct (you'll usually want to use "Average").  [This](http://www.tableau.com/sites/default/files/pages/beginner_secrets2011.pdf) is a good walkthrough on each of those subjects. 
3. Now we can begin visualizing!  I'll leave it to you to explore the different types of visualizations you can create and learn the basics of tableau.
  1. Tableau worksheets use primary datasets and secondary datasets.  A primary dataset is the dataset from which you placed the very first field in the visualization.  Any other datasets you - The secondary datasets - must have a "link" to (ie a field in common with) the primary dataset.  Sound familiar?  Your joining dataset should have fields in commmon with all of your other datasets (usually in the form of a school name or school ID)!  I recommend always usining your joining dataset as your primary dataset
    2. If you have fairly simple data, each of your datasets should be able link to to each other dataset, so it's not strictly necessary to use your joining dataset as the primary.  I'd recommend doing it anyway for continuity and ease of editing.
    3. Don't worry, this isn't the only point of the joining dataset

#####Hacks and Work-arounds
You may have noticed that there's no obvious way to do a lot of different things such as filtering by schools based on a particular grade, or adding titles.  Here's how I created all the functionalities I used in SPSInteractive.

1. Sorting data in various ways. Simply click on the leftmost axis title and a popup will appear containing a series of icons with different ways of displaying your data (ascending, descending, or list).  Choose the one you want and click on it.  Not a hack, but still useful.
2. Changing the title.  You may have noticed that there is no obvious way to add a title to your chart (there is when you create a dashboard, but it's fairly ugly and introduces bugs we don't want).  You can work around this by creating a new calculated field with just the title you want for your chart.  To do this, select the dataset you want this title in (don't worry, this won't change the original dataset.  I always use the joining dataset for storing titles) and select the down arrow next to "Dimensions".  Then select "Create new calculated field."  In the equation box type "[YOUR TITLE]" and press ok.  Now you have a field with just a title in it.  Drag the field as the leftmost entry in the "Columns" section, and your title should appear at the top of your chart.  
3. Getting rid of unwanted field labels.  Sometimes you don't want to label your fields - for example, school names are pretty obviously school names, so you don't need to label them as "School Name" - and you can remove the label by right clicking on it and selecting "Hide Field Labels for Row/Col".  
4. Filtering schools by whether or not a certain grade is taught in that school.  Remeber the lowest and highest grade fields we added to your joining dataset?  This is where these come in useful.  Create a new parameter called "Grade Included" by clicking on the down arrow next to the "dimensions" tab (It doesn't matter which dataset you have selected), and selecting "Create Parameter".  Change the data type to "Integer" and the allowable values to "List".  In the list section, add an entry for each grade in the public school system (PK-12).  Ordinarly, the values and the "display as" option will coincide, but in the case of PK and K, set the values equal to -1 and 0 respectively.  Also add an entry (value = -2) to display all the schools.  Once you do this, select the joining dataset and create a new calculated field called "Can Child Attend".  This field will contain the value "Yes" if a child can attend a specific school and "No" otherwise.  In the text entry portion enter
```
`
IF [Grade Included] = -2 
    THEN "Yes"
    
//Replace PK and K in your lowest/highest grade fields with the values you defined for them in your parameter
ELSEIF FLOAT(REPLACE(REPLACE([Highest Grade Level],'PK', '-1'),'K', '0')) >= [Grade Included] 
    THEN IF  FLOAT(REPLACE(REPLACE([Lowest Grade Level],'PK', '-1'),'K', '0')) <= [Grade Included]
        THEN "Yes"
        ELSE "No"
        END
ELSE "No"
END
`
```
After you have this field, you can place it in the filters section of any chart, select just the "Yes" option to display, and voilla. 
5. Determining average test levels.  Standardized tests (at least in Washington) are graded on a 4-level scale.  if students do poorly, they fall into level one, slightly less poorly, level two, etc.  If your data was anythink like mine, the number/percent of students that fell into each of these categories was broken up.  ie there was a field for the number/percent of students from each school who fell into level 1, level 2, etc. To get the average test level, simply create a new calculated field in each of the standardized test master datasets which calculates `1*[percent of students who fell into level 1] + 2*[percent who fell into level 2] + ...`.  
6. Determine overall average test level.  Doing this is significantly trickier than you would expect because of technical details which I won't go into, but which basically mean that you can't average calculated columns in a new calculated column.  Instead,  create a new calculated field in your joining dataset with the code 
```
`
(SUM([Math].[AvgMathLevel])+SUM([Reading].[AvgReadingLevel])+
SUM([Science].[AvgScienceLevel])+SUM([Writing].[AvgWritingLevel]))/
(COUNT([Math].[AvgMathLevel])+COUNT([Reading].[AvgReadingLevel])+
COUNT([Science].[AvgScienceLevel])+COUNT([Writing].[AvgWritingLevel]))
`
```
7. Plotting two sets of points on a map.  For most of your visualizations, this won't matter, but if you are trying to plot multiple sets of points on the same map (for example, schools and social services), or on any other chart, [here's](https://public.tableau.com/s/blog/2014/04/going-dual-axis-maps) what you do.

####Dashboards
Dashboards are the tool Tableau uses to go from individual worksheets to fully functional, interactive visualizations.  They are the format and layout of your end product and, more importantly, what you put online.  

#####Basic Steps
Creating a basic dashboard is fairly straightforward.  First, choose "Dashboard" from the toolbar and select create new dashboard.  From here, you can drag any worksheets you have saved from the left toolbar to the main page, and they will snap to fit the view.  Note that parameters you have visible on a worksheet will also show up in your dashboard.  You can remove these by clicking on them, and selecting the X in the top right of the box.  That's really all there is to a basic dashboard, but the devil is in the details.  

#####Hacks and Work Arounds
1. Changing the dashboard size.  The default size for a tableau dashboard is thin and tall, which is not always the best fit for a web page or for the vision you have for your visualization.  To change the layout, go to the bottom section of the left toolbar, select the dropdown next to "Size", select "Exactly", and input the dimensions you want.  I used width=1100px, height = 700px, which seems to fit well on a web page.
2. Creating the perfect layout.  Tableau uses a system of horizontal and vertical tiles to fit each element of a dashboard nicely into the page.  Horizontal tiles allow any worksheets placed in them to automatically change width and share the space in that tile evenly.  Vertical tiles do the same thing, except that they allow worksheets to change their height.  Normally, when you drag a worksheet onto the dashboard, it will make a guess as to how you meant to place it, and dynamically add horizontal and vertical tiles to accomidate you.  This method works fine if you are only placing a few worksheets on a page, but it gets trickier the more you need to add.  I recommend designing your dashboard on paper first, creating the layout in Tableau by hand, then placing worksheets directly into the desired tile.  I've included a more detailed guide on how to do this [here](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Creating%20Layouts.pptx)
3. Making worksheets interact with one another.  You may have noticed that in my visualization, when you hover over the entry for a specific school in one chart, the corresponding entries in all the other charts are also highlighted.  Also, when you select a school or set of schools on the map, the charts automatically filter to show only results for the selected schools.  These are done with things called actions.  To create a new action, select Dashboard -> Action -> add action.  There are three types of actions: filter, highlight, and URL, but we'll only be using the filter and highlight actions.  Once you decide what type of action to create, there are four parameters you must set.
  1. Run On: Determines what type of behavior triggers the action to occur.  ie, should it happen when you hover over a value?  Or only when you click on it 
  2. Source Sheets: The Run On behavior only triggers an action if it is enacted on the worksheets included here.  These are only sheets that you've included in your dashboard.
  3. Target Sheets: Once an action has been triggered, it will effect only the target sheets.  For example, if you've created a highlight action, only the values in the target sheets will be highlighted once the action is triggered.
  4. Clearing the Selection: This determines what happens when you stop doing the behavior which initially triggered the action.  You will usually want this to be set to "Leave the Filter"
  5. 
Once you've done this, your action should be up and running.

###Putting it Online
Putting a Tableau visualization online is farily simple.  Go to your tableau public page, edit the url so that it reads `public.tableau.com/profile/[YOUR PROFILE NAME]/vizhome/[NAME OF WORKBOOK]/[NAME OF THE DASHBOARD YOU WANT TO DISPLAY]`.  This will bring up the dashboard on the screen.  Note that you must remove all the spaces form the name of the dashboard.  From this page, select share, and copy the "Embed Code" into the HTML file for your website.  

The rest of this step is web development - you can make it as complicated or as uncomplicated as you want.  I've included my HTML files [here](https://github.com/alwaysleaveanote/SPSInteractive/tree/master/Web%20Files) for your convenience.


#####Congratulations!  You've just created a really useful tool.  Let's get as many of these out there as possible so education data becomes a little bit less hellish to deal with.













