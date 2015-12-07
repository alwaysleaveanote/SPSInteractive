# SPSInteractive
All the files I used to create [SPSInteractive](SPSInteractive.azurewebsites.net) plus a guide to recreating it with different data

##How To
This section goes over how I created this tool and gives tips on how you can create your own

###The Data
####Getting the Data
#####Basics
Every state in the country has its' own government agency which is in charge of providing information, resources, and technical assistance for education related matters.  This means that there is no one-size-fits-all approach to gathering datasets from each different state, or even a way to gather the same datasets from each state. 

In Washington, our education agency, [OSPI](http://data.k12.wa.us:9990/PublicDWP/Web/WashingtonWeb/Home.aspx?appid=448), makes all their datasets accessible through a (so slow as to be virtually unusable) collection of datasets, which you can filter to the year/school district/school level, then download CSVs for.  Roadblocks aside, they do have a huge number of (more-or-less... kinda...) clean datasets on a lot of really useful topics such as Demographics, Free or Reduced Priced Lunch, Test Scores, and English as a Second Language students.  

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

Simply tracking down and getting my hands on all of these datasets was perhaps the most time consuming and frustrating part of this project - hopefully this information will help you get it done faster.  Do some research beforehand to find the best way to get the data and to see if your state has any special programs you should gather data on.

#####Roadblocks I faced
One of the biggest problems I had in getting the data was that the OSPI tool requires you to download separate datasets for each school year and each grade level, meaning I had to download and combine literally hundreds of datasets by hand.  This, combined with extremely slow filtering and downloading made this process excruciating.  Don't be stupid like me.  These agencies more than likely have all the years and grades for any particular dataset already combined and saved on their own servers.  Email them and ask for the files!    

Another problem I had was that not all of the datasets I wanted were on the OSPI website.  In Seattle, schools publish a "report card" every year with information about average class sizes, attendance rates, etc. Unfortunately, each of these reports is hosted on a separate page and there is no easy way to get that data.  If this happens to you **Email the school district**.  If that doesn't work, and you really need the data, you're just going to have to do it the hard way: by hand or by web scraper.  

####Cleaning the Data
#####Basic Process
Once you have all the datasets, odds are they're too dirty to do anything with.  There are too many weird little errors which could break your entire visualiztion for me to go over, but I'll include the process I went through to clean my data, as well as some of the tricky errors I encountered

1. Combine all similar datasets.  The first thing you should do after you finish getting all your datasets is combine similar ones.  If, like me, you have a different dataset for each grade and school year, this can be a long, arduous process.  Sorry.  Watching Netflix while you copy and paste all the similar datasets into one master dataset makes it a little bit more bearable.  If you took my advice and emailed the agency directly, congratulations you saved yourself hours of drudgery. Or cost yourself hours of Netflix.  Depends on how you look at it.
2. Now duplicate these master datasets and save one copy in a separate folder.  This isn't strictly necessary, but you'll be glad you did it if you mess up the cleaning process and need to revert to an earlier version.
3. Finally, it's time to start cleaning.  First, go through each of the master datasets (note that these are not the master datasets you saved in a separate folder, but rather the duplicates) and take out any fields you aren't interested in.  Use your best judgement on which fields to delete (you can always restore them from the master copies later), but having 20 different fields for each dataset can the visualization tool you use (I used Tableau) crowded and hard to use.  
  *NOTE: Don't delete unique identifiers such as School Codes.  These can be really useful if the actual names for these entities vary slightly across your datasets (which shouldn't happen, but it does).
4. Make field names easy to understand.  If a field has a name that you wouldn't immediately understand, or one that is unnecessarily long, change it to something better.  This'll make your life a lot easier later. 
5. Normalize field names.  Make sure any fields that your various master datasets have in common (ie school names, school years, etc.) have the same name.  This will make it a lot easier to link the various files in your visualization tool.
6. Get the latitude and longitude values for the school's addresses using a tool like [Batch Geocode](http://www.findlatitudeandlongitude.com/batch-geocode/#.VmTOOfmDGko) and add them to your directory dataset.
7. Create "joining" datasets.  All of the visualization tools I've come across use "links" between similar fields of different datasets to display two different datasets on the same chart.  Having a central datasets which all your datasets can link to makes everything a lot simpler.  I included School Name, school type, lowest grade level, highest grade level, and the name of the grade range (ie elementary school, k-8 school, etc.).  [Here](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Datafiles/General.xlsx) is the joining dataset I used  You may have to add fields to this if your project varies from mine - for example, if you use a school ID rather than a school name to identify schools, you will have to include a SchoolID field in your joining dataset.  
  *NOTE: I never use the School Type or Grade Range Name fields throughout my project.  You can leave them in if you think you will use them, but it is not necessary.  
  *NOTE: I also had a [JOIN ON](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Datafiles/JOIN%20ON.xlsx) dataset which I used throughout my project.  I only ever used the SchoolName field from it, though, which General also contains, so I could easily get rid of it and use only General.  Keep this in mind if you look at my Tableau files.   
  *NOTE: If this doesn't make sense to you yet, don't worry.  It'll make a lot more sense once we begin visualizing
8. Create a Grades Included dataset containing a row for each grade (PK-12) in the public school system.  You can just copy [mine](https://github.com/alwaysleaveanote/SPSInteractive/blob/master/Datafiles/Grades%20Included.xlsx).  This will come in useful when we begin visualizing.  

#####Things to Watch Out For
1. Schools can close from year to year.  If you want to create a tool which only shows schools that are currently in business, make sure that you obtain an up to date directory, and use only the schools in this directory when creating your joining datasets.  

####Special Datasets
In Seattle, each school has a specific attendance zones.  If you don't live within this zone, you have to get special permission to attend the school.   












