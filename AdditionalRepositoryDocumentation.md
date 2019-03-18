## About this document
This document is to comment the source code that does not allow for comments within the file, this includes the .json and .yml file types.

## package.json and package-lock.json
These are 2 files that are needed to be placed in the repo for the developer to be able to run the npm install command to 
download all of the project dependencies needed to run the project.  These files actually appear in 2 places in the repo due to how our project
was structured early on.  They appear in the root folder of the page and also in the src folder of the page, this is because the one in the
root folder is needed to run the project in Heroku since these files are suppsed to be kept in the root folder of the application for it to run
in Heroku and Travis CI.  It also appears in the src folder for when someone is to run the project from their machine locally.

## .travis.yml
This file is needed for setup to run the project in Travis CI.  It includes information about how Travis CI needs to set up the project as
well as information on what to do with the project whenever the CI passes the build.  The file indicates that travis needs to build a 
node.js project and then on a successful build deploy the project to the Heroku deployment.

## data/banneritem.json
This file was used to set up dummy data for the app to use.  It contains 3 sample banneritems that would be inserted into the database to test.
The 3 sample banneritems have different combinations of fields filled out to test to see if the banner item would display with the information
in the right time frames with links or priority included.  An example of one of these can be seen below.
'''
{
        "_id":  2,
        "description": "No Link",
        "startDate": "02-08-2019",
        "endDate": "02-09-2019",
        "startTime": "12:00 AM",
        "endTime": "12:00 AM",
        "priority": false,
        "link": ""
        
    }
'''

## Public Folder
The public folder is where assets needed for the site are kept.  This includes the manifest, css, images, and various js files used by the site

## public/vendor
This is where the main bootstrap and jquery files were stored.  We tried to use these files first if we could since it is better to have the files
in the project than to access them via CDN every single time.  If we needed to use a different version for a certain page we did use CDN access
to JQuery or bootstrap if it was needed.  One example that we opted to use a jquery cdn over these files is for the date picker calendars
since they required a different version of jquery and jquery ui than what we have and since it they appear on a limited number of pages it was more
convienant to use the cdn there.

## public/manifest.json
The manifest file is needed for PWA functionality, it is also good to have in a site since it gives you options to style things in the
browser that you cannot with html.  The manifest file gave us options to color tabs on mobile browsers and the option to provide a
custom app icon if the user decided to add the page to their homescreen. The file contents can be seen below.
'''
{
  "name": "HughesFH",
  "short_name": "HughesFH",
  "icons": [{
      "src": "img/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }],
  "start_url": "/",
  "display": "standalone",
  "background_color": "#006747",
  "theme_color": "#FFFFFF"
}
'''

## Other code documentation
Other code documentation can be seen in the actual files them selves.  All of our project files that did allow us to comment in them, 
we went through and added comments to explain what the code is doing in the project.
