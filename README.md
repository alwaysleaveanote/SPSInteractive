# SPSInteractive
All the files I used to create SPSInteractive.azurewebsites.next plus general guidelines on how to recreate it with different data

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

Another problem I had was that not all of the datasets I wanted were on the OSPI website.  In Seattle, schools publish a "report card" every year with information about average class sizes, attendance rates, etc. Unfortunately, each of these reports is hosted on a separate page and there is no easy way to get that data.  If this happens to you 
