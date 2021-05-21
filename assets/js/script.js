//variable for the current time
var now = moment().format("(M/D/YYYY)");
var dateHolderEl = document.querySelector("#current-date");
dateHolderEl.innerHTML = '<h2>'+ now + '</h2>';
var searchedCity = document.querySelector("#searched-city");
var uvi = document.querySelector('#uvi')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')
var humidity = document.querySelector('#humidity')
var todaysIcon = document.querySelector('#todays-icon')


function searchWeather (event){
    event.preventDefault()
    var searchTerm = document.getElementById('search-term').value;
    console.log(searchTerm);
    TodaysWeather(searchTerm);
    DayForecast(searchTerm);
}

function TodaysWeather (city) {
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=979cfe54b240cc95d9a8010066868f0b'
      )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        searchedCity.innerHTML = '<h2>'+ data.name +'</h2>'
        var lat = data.coord.lat
        var lon = data.coord.lon
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily,minutely&appid=979cfe54b240cc95d9a8010066868f0b&units=imperial'
        )
        .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            uvi.innerHTML= data.current.uvi
            uvi.style.padding = '5px 10px'
            if (data.current.uvi < 5) {
                uvi.style.backgroundColor='green'
            }
            else if (data.current.uvi < 7 ) {
                uvi.style.backgroundColor ='yellow'
            }
            else {
                uvi.style.backgroundColor = 'red'
                uvi.style.color = 'white'
            }
            temp.innerHTML= 'Temp: ' + data.current.temp + ' F' 
            wind.innerHTML= 'Wind: ' + data.current.wind_speed + ' MPH'
            humidity.innerHTML= 'Humidity: ' + data.current.humidity + ' %'
            var iconUrl = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
            todaysIcon.setAttribute('src', iconUrl);
          })
        });
}

function DayForecast(city) {
    
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=979cfe54b240cc95d9a8010066868f0b'
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        });
  }


  
var searchButton = document.querySelector('#search');
searchButton.addEventListener("click", searchWeather);