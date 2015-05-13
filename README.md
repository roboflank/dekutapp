## Client

This Branch is for the Apps version but with twitt feature

## Getting Started
One line install
```
git clone https://github.com/denzelwamburu/kimathiuniapp.git#0.3 && cd kimathiuniapp && sudo npm install 
```

To Run this app locally, follow the simple steps below:

-Clone the repo to your /projectfolder or download the project
```
git clone github.com/denzelwamburu/kimathiuniapp.git#0.3
```
-Open Your Terminal and start a new Ionic Project

```
Ionic start DekutApp
```
-Copy the downloaded files of this project and paste it to the www folder and override the previous files
<br/>
-
# MicroBlog Ionic
This example application demonstates how to use [LoopBack](http://loopback.io) with the [Ionic Framework](http://ionicframework.com/).<br/>
A simple twitter like Clone using LoopBack Backend<br/>
Demonstrates Client Login with LoopBack Auth Apis
##Features
MicroBlog is a basic microblogging clone with following features:
- Users can register and login to the app
- Only authorized user can see content
- Post, like and comment tweets
- User can choose an avatar.


###Screenshots
![Alt text](screenshots.png)

##Getting started
Before starting, makes sure you've followed [Getting Started with LoopBack](http://docs.strongloop.com/display/LB/Getting+started+with+LoopBack) to install Node and LoopBack.
In adittion, you will need a basic understanding of:
 - [AngularJs](https://angularjs.org/)
 - Ionic [CSS](http://ionicframework.com/docs/components/) and [Javascript](http://ionicframework.com/docs/api/) components  

```
git clone https://github.com/kimathijs/MicroBlogg.git 
cd loopback-example-ionic
npm install 
slc run
```
Open a new terminal
```
cd loopback-example-ionic/client
npm install
ionic serve
```
Open [localhost:8100](http://localhost:8100/) in your browser to view the app or get the (PhoneGap Developer App)[http://app.phonegap.com/] to run the app on your phone.
Don't forget to change the api url in `client/www/lib/lb-services.js` to the IP of your local machine or your server
```
 var urlBase = "http://192.168.0.102:3000/api";
```

##ToDo
- Implement Passport.Js for FacebookAuth
- Optimize performence (less requests to server)
- Add feature like edit, delete...

##Ionic
All Ionic files are in the `client/www` folder. Documentation how this app works are inside the `*.js` files

##Loopback
By default, data in the memory connector are transient.  When an application using the memory connector exits, all model instances are lost.  To maintain data across application restarts, I specified a JSON file in which to store the data.
`server/datasources.json``
```
{
  "db": {
    "name": "db",
    "connector": "memory",
    "file": "memoryDb.json"
  }
}
```
Sample content and user so you can start right of:

 Username | Password 
 -------- | -------- 
 James    | james    
 Bob      | bob      
 Mary     | mary     

###Usefull commands
- `lb-ng server/server.js client/www/lib/lb-services.js`to generate Loopback Service for AngularJS based on your project
- `lb-ng-doc client/www/lib/lb-services.js` show documentation for generated file

###Loopback Database Schema
- `avatar`
  - id number 
  - url string
  - ownerId number
- `comments`
  - id number 
  - content string
  - date date
  - username string
- `tweet`
  - id number 
  - content string
  - date date
  - ownerUsername string
- `user`
  - id number 
  - username string
  - created date
  - avatar string
- `like` 
  - id number   

### Loopback Model Relation
- `comments`
  - belongsTo
    - tweet (foreignKey: tweetId)
    - user (foreignKey: ownerId)
- `tweet`
  - belongsTo
    - user (foreignKey: ownerId)
  - hasMany
    - comments (foreignKey(tweetId)
    - like (foreignKey(tweetid)
- `user`
  - hasMany
    - tweets (foreignKey: ownerId) 
    - likes (foreignkey: ownerId)
- `like` 
  - belongsTo
    - user (foreignKey: ownerId)
    - tweet (foreignKey: tweetId)

### Other ressources used
- custom time filter for angular https://github.com/B-Sides/angular-timedistance
- pictures used in this app http://www.deviantart.com/art/Face-Avatars-107881096
