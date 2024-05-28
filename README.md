# WeatherApp

Basic application for displaying weather info by city name.

The application can be tested here:
https://anastat.github.io/weather-app/

To test it locally, please add environment.ts file

´´´
export const environment = {
  production: false,
  apiUrl: 'http://api.openweathermap.org/data/2.5',
  weatherApiKey: 'YOUR_API_KEY',
};
´´´
## TODO

- Handle invalid input if empty or city not found: Alert component or notification
- Create separate component for displaying weather info
- Create reusable, generic components for input, search, and radio buttons.
