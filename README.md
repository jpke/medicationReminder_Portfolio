# Medication Reminder App

An app that is designed to set a reminder to take all of your medication on file at any given time by sending an email.  It can also delay the by certain intervals.   

## Getting started

### Setting up a project

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://github.com/oampo/thinkful-full-stack-template YOUR_PROJECT_NAME`
* Move into the project directory: `cd YOUR_PROJECT_NAME`
* Install the dependencies: `npm install`
* Create a new repo on GitHub: https://github.com/new
    * Make sure the "Initialize this repository with a README" option is left **un**checked
* Update the remote to point to your GitHub repository: `git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`
* Make sure everyone in your group is working out of separate branches on github and push to their branch.  This becomes important when merging together different files.  
### Tech Stack
* MongoDB
* Express
* React/Redux
* Node



### Working on the project


* Divide the tasks into 3 sections, example, UI/REACT/BACKEND.  
* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm run dev`
    * Starts a server running at http://localhost:8080
    * Automatically rebuilds when any of your files change

## Directory layout

```
.
├── client      Client-side code
│   ├── assets  Images, videos, etc.
│   ├── js      JavaScript
│   └── scss    SASS stylesheets
├── server      Server-side code
└── test        Tests
    ├── client  Client tests
    └── server  Server tests
```

##API Documentation
###User Endpoint
**/user**

Endpoint to user of Medication Reminder App



**POST/user**
Creates a new username and password

*Data Parameter:*
username and passwords


*Returns:*
a string

*Example:*
```
> {
>     "username": "your_username",
>     "password": "your_password"
> }
> Status: 201 Created

```


**PUT/user**
Edit and Update user information

*Data Parameter:*
username and/or password

*Require:*
passport authentication using username and password

*Returns:*
a string

*Example:*
```
> {
>     "username": "your_username",
>     "password": "your_password"
> }
> Status: 201 Created

```


**DELETE/user**
Delete user account

*Data Parameter:*
None

*Require:*
passport authentication to prevent anyone besides user to delete the data

*Returns:*
An empty object

*Example:*
```
> Status: 200 OK
> {
> }

```


###Medication Endpoint
**/medication**
Endpoint for all medications


**GET/medication**
get an object of medications

*Data Parameter:*

*Require:*
passport authentication

*Returns:*
An object of medications

*Example:*
```
> Status: 200 OK
> {
>     "userId": User ObjectID,
>     "name": "medication name",
>     "date": "Date (day of week)",
>     "time": "time",
>     "taken", false
> }
```


**POST/medication**
Adds medication

*Data Parameter:*
medication

*Require:*
passport authentication

*Returns:*
An object of medications

*Example:*
```
> Status: 201 Created
> {
>     "userId": User ObjectID,
>     "name": "medication name",
>     "date": "Date (day of week)",
>     "time": "time",
>     "taken", false
> }


**PUT/medication**
Edit and Update medication list

*Data Parameter:*
medication, time, and/or date

*Require:*
passport authentication

*Returns:*
an object of medications

*Example:*
```
> {
>  		userId: new_medication.userId,
>    	name: new_medication.name,
>       date: new_medication.date,
>       time: new_medication.time,
>       taken: new_medication.taken
> }
> Status: 201 Created

```


**DELETE/medication**
Delete medication list

*Data Parameter:*

*Require:*
passport authentication

*Returns:*
An empty object

*Example:*
```
> Status: 200 OK
> {
> }

```



## Deployment

Requires the [Heroku CLI client](https://devcenter.heroku.com/articles/heroku-command-line).

### Setting up the project on Heroku

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Create the Heroku app: `heroku create PROJECT_NAME`
* Instruct Heroku to install the development dependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`

### Deploying to Heroku

* Push your code to Heroku: `git push heroku master`

## Continuous Integration

* Add your repository to [Travis CI](https://travis-ci.org/)

## Continuous Deployment

Requires the [Travis CLI client](https://github.com/travis-ci/travis.rb).

### Setting up CD

* Add the following configuration to `.travis.yml`:

    ```
    deploy:
      provider: heroku
      app: YOUR_HEROKU_APP_NAME
    ```
* Add your Heroku API key: `travis encrypt $(heroku auth:token) --add deploy.api_key`

### Deploying using CD

* Push your code to GitHub: `git push origin 
