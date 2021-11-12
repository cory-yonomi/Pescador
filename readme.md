# Fishing Journal
The Angler's Choice for Tracking Catches, Weather, and Conditions

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
//waterservices.usgs.gov/nwis/iv/?format=json&sites=01646500&parameterCd=00060,00065&siteType=ST&siteStatus=all

This returns a JSON file that contains this measuring site's USGS ID number, geographic position, most recently measured stream height and flow, and it's time zone info.

http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=Austin

Provides current weather data for Austin, including temperature, barometer pressure, daily precipitation and more

## MVP
 - User can create journal entry of a fishing trip including weather, fish caught, location
 - Add streams/stations to favorites list
 - Gives current weather and day forecast

## Stretch Goals
- Google Maps API for saving favorite spots
- Gives most recent stream condition for favorited stream(s)
- Weather history for chosen locations
- Search for/display date ranged stream data
- Ability to add stillwater sites with information

## Potential Roadblocks

- USGS Data is a little convoluted, may be difficult to implement as I like.
- Inconsistent data points between individual sites and waterbody types



