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
    localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
    todaysWeather(searchTerm);
    // DayForecast(searchTerm);
}

function loadCities (cities) {
cities = JSON.parse(localStorage.getItem("searchTerm"));
var $div = $('past-search');
var $ul = $('<ul>');
$div.append($ul);
var $cityli = $('<li>')
$cityli.addClass('past-term-li').text(cities)
$ul.append($cityli);


}



function todaysWeather (city) {
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

// function DayForecast(city) {
    
//     fetch(
//       'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=979cfe54b240cc95d9a8010066868f0b'
//     )
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(data) {
//         console.log(data);
//         });
//   }


for (let i = 1; i <= 5; i++) {
    let arrayCounter = 0;
    let $ul = $('#day' + i);
    let $li1 = $('<li>');
    $li1.addClass('list-group-item list-group-flush');
    
    let $li2 = $('<li>');
    $li2.addClass('list-group-item list-group-flush');
    let $li3 = $('<li>');
    $li3.addClass('list-group-item list-group-flush');
    let $li4 = $('<li>');
    $li4.addClass('list-group-item list-group-flush');
    $ul.append($li1).append($li2).append($li3).append($li4);

    // var searchTerm = document.getElementById('search-term').value;
    // fetch(
    //     'https://api.openweathermap.org/data/2.5/forecast?q=' + searchTerm + '&appid=979cfe54b240cc95d9a8010066868f0b'
    //   )
    //     .then(function(response) {
    //       return response.json();
    //     })
    //     .then(function(data) {
    //       console.log(data);
    //     //   $li1.innerHTML= data.list[5].dt_txt 
    //       });



}

  
var searchButton = document.querySelector('#search');
searchButton.addEventListener("click", searchWeather);