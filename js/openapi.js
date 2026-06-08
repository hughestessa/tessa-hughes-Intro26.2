/*Weather API*/
const BASE_URL = 'https://api.open-meteo.com/v1/forcast';
const COORDS = 'latitude=34.7448&longitude=-87.6675'; /*Muscle Shoals, AL*/

const weatherDescriptions = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  51: 'Light Drizzle',
  61: 'Slight rain',
  63: 'Rain',
  65: 'Heavy Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  80: 'Rain showers',
  95: 'Thunderstorm',
  96: 'Hail',
  99: 'Hail',
};

const weatherImages = {
  0: 'http://openweathermap.org/img/wn/01d@2x.png',
  1: 'http://openweathermap.org/img/wn/01d@2x.png',
  2: 'http://openweathermap.org/img/wn/02d@2x.png',
  3: 'http://openweathermap.org/img/wn/03d@2x.png',
  45: 'http://openweathermap.org/img/wn/50d@2x.png',
  51: 'http://openweathermap.org/img/wn/09d@2x.png',
  61: 'http://openweathermap.org/img/wn/10d@2x.png',
  63: 'http://openweathermap.org/img/wn/10d@2x.png',
  65: 'http://openweathermap.org/img/wn/10d@2x.png',
  71: 'http://openweathermap.org/img/wn/13d@2x.png',
  73: 'http://openweathermap.org/img/wn/13d@2x.png',
  75: 'http://openweathermap.org/img/wn/13d@2x.png',
  80: 'http://openweathermap.org/img/wn/09d@2x.png',
  95: 'http://openweathermap.org/img/wn/11d@2x.png',
  96: 'http://openweathermap.org/img/wn/11d@2x.png',
  99: 'http://openweathermap.org/img/wn/11d@2x.png',
};

const airQualityIndexes = [
    {min:0, max:50, descr:"Good"},
    {min:51, max:100, descr:"Moderate"},
    {min:101, max:150, descr:"Unhealthy for Sensitive Groups"},
    {min:151, max:200, descr:"Unhealthy"},
    {min:201, max:300, descr:"Very Unhealthy"},
    {min:301, max:500, descr:"Hazardous"}
];

const weatherForm  = document.querySelector('form[id="search_weather"]');
weatherForm.addEventListener('submit', event => {
    event.preventDefault(); //To preserve to log without refreshing right away
    weatherForm.reset(); //To clear the form

    getTodayWeather();
});


async function getTodayWeather() {
  try {    
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=34.7448&longitude=-87.6675&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&models=gfs_seamless&timezone=auto&forecast_days=1&wind_speed_unit=mph&precipitation_unit=inch&temperature_unit=fahrenheit');
    if (!response.ok) {
      throw new Error(response.status);  
    }
    const data = await response.json()
    console.log("Data: ", data);
    
    /*Temp Min Code*/
    const temperatureMin = data.daily.temperature_2m_min[0];
    console.log(temperatureMin);
    let temperatureMinText = 'Min Temp: ' + temperatureMin + '°F';
    console.log(temperatureMinText);
    temperatureMinElement = document.getElementById("temperatureMin");
    temperatureMinElement.innerText = temperatureMinText;
    
    /*Temp Max Code*/
    const temperatureMax = data.daily.temperature_2m_max[0];
    console.log(temperatureMax);
    let temperatureMaxText = 'Max Temp: ' + temperatureMax + '°F';
    console.log(temperatureMaxText);
    temperatureMaxElement = document.getElementById("temperatureMax");
    temperatureMaxElement.innerText = temperatureMaxText;

    /*Weather Condition Code*/
    const condition = data.daily.weather_code[0];
    console.log(condition);
    if(condition in weatherDescriptions){
        conditionText = 'Weather Condition: ' + weatherDescriptions[condition];
    }
    else {
        conditionText = 'Weather Condition: N/A';
    }
    console.log(conditionText);
    conditionElement = document.getElementById("weather-condition");
    conditionElement.innerText = conditionText;

    /*Weather Condition Image Code*/
    if(condition in weatherImages){
        conditionImgUrl = weatherImages[condition];
        conditionImgElement = document.getElementById("weatherIcon");
        conditionImgElement.src = conditionImgUrl;
        conditionImgElement.style.display = 'block';
    }
    else {
        conditionImgUrl = '';
    }
    

    /*Sunrise Time Code*/
    const sunrise = data.daily.sunrise[0].split("T")[1];
    console.log(sunrise);
    let sunriseText = 'Sunrise: ' + sunrise;
    console.log(sunriseText);
    sunriseElement = document.getElementById("sunrise");
    sunriseElement.innerText = sunriseText;

    /*Sunset Time Code*/
    const sunset = data.daily.sunset[0].split("T")[1];
    console.log(sunset);
    let sunsetText = 'Sunset: ' + sunset;
    console.log(sunsetText);
    sunsetElement = document.getElementById("sunset");
    sunsetElement.innerText = sunsetText;

    return data;
    
  } catch (error) {
    console.log('Could not fetch data');
    console.error(error);  
  } 
}

// Air Quality API
// Today in Muscle Shoals, AL
// https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.7448&longitude=-87.6675&current=us_aqi,dust,uv_index&timezone=auto&forecast_days=1

const airQualForm  = document.querySelector('form[id="search_air_quality"]');
airQualForm.addEventListener('submit', event => {
    event.preventDefault(); //To preserve to log without refreshing right away
    airQualForm.reset(); //To clear the form

    getTodayAirQual();
});

async function getTodayAirQual() {
  try {    
    const response = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.7448&longitude=-87.6675&current=us_aqi,dust,uv_index&timezone=auto&forecast_days=1');
    if (!response.ok) {
      throw new Error(response.status);  
    }
    const data = await response.json()
    console.log("Data: ", data);
    
    /*Air Qual Index Code*/
    const airQualIndex = data.current.us_aqi;
    console.log(airQualIndex);
    if (airQualIndex !== null && airQualIndex !== undefined) {
        const matchedRange = airQualityIndexes.find(range => {
            return airQualIndex >= range.min && airQualIndex <= range.max;
        });
        if (matchedRange) {
            airQualDescr = matchedRange.descr;
        }
        else {
            airQualDescr = '';
        }
    }

    let airQualIndexText = 'Air Quality Index: ' + airQualIndex + ' ' + airQualDescr;
    console.log(airQualIndexText);
    airQualIndexElement = document.getElementById("airQuality");
    airQualIndexElement.innerText = airQualIndexText;

    return data;
    
  } catch (error) {
    console.log('Could not fetch data');
    console.error(error);  
  } 
}