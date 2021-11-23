# Fishing Journal
The Angler's Choice for Tracking Catches, Weather, and Conditions

## Use Instructions
Pescador is live at https://pescador.herokuapp.com/, where you can simply create a user account and begin creating streams, trips, and fish.

Upon creating your account, head to the profile page and enter your zip code and fishing style. Next, you'll want to create your first stream so that you can set it as your favorite.

Once your profile is complete, the dashboard will be fully functioning. From there, you can add more fishing spots, or enter your first trip. Trips are associated with a specific stream and can have fish added to them. 

## Routes

| Verb   | URL Pattern               | Action | Description                                        |
| ------ | ------------------------- | ------ | -------------------------------------------------- |
|        |                           |        |                                                    |
| GET    | /                         | READ   | Show the log in/sign up page                       |
| GET    | /home                     | READ   | Show the dashboard                                 |
| GET    | /profile                  | READ   | Shows the user's profile page                      |
| GET    | /profile/edit             | READ   | Shows a form for editing the user profile          |
| PUT    | /profile                  | UPDATE | Puts edits to user's profile to the database       |
| GET    | /streams                  | READ   | Shows all user's streams                           |
| GET    | /streams/new              | READ   | Shows a form for adding a new stream               |
| POST   | /streams                  | CREATE | Adds a new stream to the database                  |
| GET    | /streams/:id              | READ   | Shows a stream's information                       |
| GET    | /streams/edit/:id         | READ   | Shows a form for editing a stream's info           |
| PUT    | /streams/:id              | UPDATE | Puts edited stream info to database                |
| DELETE | /streams/:id              | DELETE | Deletes the selected stream                        |
| GET    | /journal                  | READ   | Shows a user's trip journal                        |
| GET    | /journal/:id              | READ   | Show's a trip's information                        |
| POST   | /journal                  | CREATE | Creates a new trip in the database                 |
| PUT    | /journal/:id              | UPDATE | Puts edited trip info to the database              |
| DELETE | /journal/:id              | DELETE | Deletes the selected journal                       |
| GET    | /journal/:id/fish         | READ   | Shows the form for adding a fish to a trip         |
| POST   | /journal/:id              | CREATE | Adds the fish to the database attached to the trip |
| DELETE | /journal/:id/fish/:fishId | DELETE | Deletes the selected fish                          |

## Tech Stack
Postgres, Express, Node, Sequelize, EJS, Bootstrap

## Wireframes
![Landing](https://i.imgur.com/nqoONfI.png)
![Dashboard](https://i.imgur.com/YScxCud.png)
![Add Stream](https://i.imgur.com/ViizPVa.png)
![Streams Display](https://i.imgur.com/Bk3uJJt.png)
![Add Trip](https://i.imgur.com/GimMLii.png)
![Display Individual Trip](https://i.imgur.com/xbO2t7D.png)
![Journal Display](https://i.imgur.com/Ualnssn.png)
![Add A Fish](https://i.imgur.com/S0NNmGI.png)

## APIS
United States Geological Service Water Services API and Weather API

## ERD
![ERD Diagram](https://i.imgur.com/HFAV5RG.png>)

## API Calls and Descriptions
#### Current:

https://api.openweathermap.org/data/2.5/weather?zip=78745&units=imperial&appid=myAPIKey

This returns a JSON file with current weather information for Austin including temperature, pressure, wind speed and direction, and humidity.

#### Coming soon:

//waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00060,00065&siteType=ST&siteStatus=all

This returns a JSON file that contains this measuring site's USGS ID number, geographic position, most recently measured stream height and flow, and it's time zone info.

Cloudinary API - Media storage and management API, will allow users to add photos for trips and fish.

Google Maps API - Map and location API, will allow users to add water by dropping pins. Will also provide positional data for finding and querying streams.

## MVP
 - User can create journal entry of a fishing trip including weather, fish caught, location
 - Add streams/stations to favorites list
 - Gives current weather and day forecast

## Stretch Goals
- Gives most recent stream condition for favorited stream(s)
- Weather history for chosen locations
- Search for/display date ranged stream data
- Ability to add stillwater sites with information

## Potential Roadblocks

- USGS Data is a little convoluted, may be difficult to implement as I like.
- Inconsistent data points between individual sites and waterbody types



