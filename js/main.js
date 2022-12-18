let city = document.querySelector('#town');
let mainTemp = document.querySelector('.temp');
let minTemp = document.querySelector(".minTemp")
let maxTemp = document.querySelector('.maxTemp')
let feelsLike = document.querySelector("#feels-like")
let weatherImg = document.querySelector('.weather-image');
let description = document.querySelector('.description');
let sunriseTime = document.querySelector(".sunrise");
let sunsetTime = document.querySelector(".sunset");
let pressure = document.querySelector("#pressure");
let humidity = document.querySelector("#humidity");
let input = document.querySelector("#inputCity");
let wind = document.querySelector(".wind")
let duration = document.querySelector(".duration")
let updated = document.querySelector(".updated")

let lon;
let lat;

input.addEventListener("keydown", function getCoords (e) {
    if (e.key == "Enter" && input.value) {
        let cityLink = "https://api.openweathermap.org/geo/1.0/direct?q=" + input.value + "&appid=efb3951bf73e82a7d36e65dca67ca856"
        fetch(cityLink)
            .then (function(response) {
                return response.json();
            })
            .then (function(response) {
                lon = response[0].lon;
                lat = response[0].lat;
                getWeather(lat, lon)
                getFutureWeather(lat, lon)
                update()
            })
    }
})

function getWeather(lat, lon) {
    const mainUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=efb3951bf73e82a7d36e65dca67ca856&units=metric`
    fetch(mainUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            city.innerHTML = response.name + ", " + response.sys.country;
            wind.innerHTML = "Wind: " + response.wind.speed + "m/s"
            humidity.innerHTML = response.main.humidity + "%";
            pressure.innerHTML = response.main.pressure + "hPa";
            mainTemp.innerHTML = Math.round(response.main.temp) + '&#176' + 'C';
            maxTemp.innerHTML = Math.round(response.main.temp_max) + '&#176';
            minTemp.innerHTML = Math.round(response.main.temp_min) + '&#176'
            feelsLike.innerHTML = "Feels like: " + Math.round(response.main.feels_like) + '&#176';
            description.innerHTML = response.weather[0].description;

            let sunriseDate = new Date(response.sys.sunrise * 1000);
            let sunsetDate = new Date(response.sys.sunset * 1000);
            sunriseTime.innerHTML = `Sunrise: ${sunriseDate.getHours()}:${sunriseDate.getMinutes() > 10 ? sunriseDate.getMinutes() : '0' + sunriseDate.getMinutes()}`;
            sunsetTime.innerHTML = `Sunset :${sunsetDate.getHours()}:${sunsetDate.getMinutes() > 10 ? sunsetDate.getMinutes() : '0' + sunsetDate.getMinutes()}`;
            
            switch (response.weather[0].description) {
                case 'overcast clouds':
                    weatherImg.innerHTML = '<img src= "img/weather_image/Overcast_clouds.png" alt="logo"/>';
                    break;
                case 'broken clouds':
                    weatherImg.innerHTML = '<img src= "img/weather_image/Overcast_clouds.png" alt="logo"/>';
                    break;
                case 'few clouds':
                    weatherImg.innerHTML = '<img src= "img/weather_image/few_clouds.png" alt="logo"/>';
                    break;
                case 'light snow':
                    weatherImg.innerHTML = '<img src= "img/weather_image/light_snow.png" alt="logo"/>';
                    break;
                case 'clear sky':
                    weatherImg.innerHTML = '<img src= "img/weather_image/clear_sky.png" alt="logo"/>';
                    break;
                case 'snow':
                    weatherImg.innerHTML = '<img src= "img/weather_image/light_snow.png" alt="logo"/>';
                    break;
                case 'moderate rain':
                    weatherImg.innerHTML = '<img src= "img/weather_image/rain.png" alt="logo"/>';
                    break;
                case 'light rain':
                    weatherImg.innerHTML = '<img src= "img/weather_image/rain.png" alt="logo"/>';
                    break;
            }
        })
}

function getFutureWeather(lat, lon) {
    const futureDays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=efb3951bf73e82a7d36e65dca67ca856`
    fetch(futureDays)
        .then(function(response){
            return response.json()
        })
        .then(data => {
            // console.log(data);
            const daysInfo = document.querySelectorAll(".days-info");
            let indexDays = 8;
            daysInfo.forEach(element => {
                element.querySelector(".day").innerHTML = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(new Date(data.list[indexDays].dt * 1000));
                
                // element.querySelector(".img").setAttribute("src", `http://openweathermap.org/img/wn/${data.list[indexDays].weather[0].icon}@2x.png`);
                switch (data.list[indexDays].weather[0].description) {
                    case "light snow":
                        element.querySelector(".img").setAttribute("src", "img/weather_image/light_snow.png");
                        break;
                    case 'overcast clouds':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/Overcast_clouds.png");
                        break;
                    case 'broken clouds':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/Overcast_clouds.png");
                        break;
                    case 'few clouds':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/few_clouds.png");
                        break;
                    case 'light snow':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/light_snow.png");
                        break;
                    case 'clear sky':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/clear_sky.png");
                        break;
                    case 'moderate rain':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/rain.png");
                        break;
                    case 'light rain':
                        element.querySelector(".img").setAttribute("src", "img/weather_image/rain.png");
                        break;
                }
                

                let tempMin = 10000;
                let tempMax = 0;
                for (let i = 0; i < 8; i++) {
                    if (tempMin > data.list[indexDays + i].main.temp) tempMin = data.list[indexDays + i].main.temp;
                    if (tempMax < data.list[indexDays + i].main.temp) tempMax = data.list[indexDays + i].main.temp;
                }
                element.querySelector(".day-temp").innerHTML = `<span class="tempValue">${Math.round(tempMin - 273)}°</span> / <span class="tempValue">${Math.round(tempMax - 273)}°</span>`;
                indexDays += 8;
            });
        })
        .catch(error => console.log(error.message));
}

// const nextDaysWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     fetch(nextDaysWeatherUrl)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data);
//             const nextDays = document.querySelectorAll(".next-day");
//             let indexDays = 8;
//             nextDays.forEach(element => {
//                 element.querySelector(".day-of-the-week").innerHTML = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(data.list[indexDays].dt * 1000));
//                 element.querySelector(".icon").setAttribute("src", `http://openweathermap.org/img/wn/${data.list[indexDays].weather[0].icon}@2x.png`);

//                 let tempMin = 10000;
//                 let tempMax = 0;
//                 for (let i = 0; i < 8; i++) {
//                     if (tempMin > data.list[indexDays + i].main.temp) tempMin = data.list[indexDays + i].main.temp;
//                     if (tempMax < data.list[indexDays + i].main.temp) tempMax = data.list[indexDays + i].main.temp;
//                 }
//                 element.querySelector(".temp").innerHTML = `<span class="tempValue">${Math.round(tempMin - 273)}°</span> / <span class="tempValue">${Math.round(tempMax - 273)}°</span>`;
//                 indexDays += 8;
//             });
//         })
//         .catch(error => console.log(error.message));




function update() {
    return updated.innerHTML = "Updated: " + tikTok.innerHTML + " " + date.innerHTML
}