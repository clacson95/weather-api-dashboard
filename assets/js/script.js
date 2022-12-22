
const apiKey = "e1838e4144e827f98e3f73fb152977c7";

const forecast0 = document.querySelector("#calendar");


var today = moment();

function calendar() {

    // reference: https://momentjs.com/ 
    // the moment() method can be used to call the immediate time/date depending on the specified format
 

    // adding (hour:minute:second) clock to header
    $("#time").text(today.format("LTS"));

    // adding (day of the week, month day, year) for today's weather
    $("#forecast0").text(today.format("dddd, MMMM Do YYYY"));


    var nextDay = moment(startdate = today).add(1, 'days');
    $("#forecast1").text(nextDay.format("MM/DD"));
    var nextDay2 = moment(startdate = nextDay).add(1, 'days');
    $("#forecast2").text(nextDay2.format("MM/DD"));
    var nextDay3 = moment(startdate = nextDay2).add(1, 'days');
    $("#forecast3").text(nextDay3.format("MM/DD"));
    var nextDay4 = moment(startdate = nextDay3).add(1, 'days');
    $("#forecast4").text(nextDay4.format("MM/DD"));
    var nextDay5 = moment(startdate = nextDay4).add(1, 'days');
    $("#forecast5").text(nextDay5.format("MM/DD"));

}

setInterval(calendar, 100);
calendar();




function getCity() {

    let city = document.querySelector("input").value;
   

       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(res => res.json()).then(data => {
       
       localStorage.setItem('previousCity', localStorage.getItem('currentCity'));
       localStorage.setItem('currentCity', city);
       getWeatherData(data);
       
})
}

function previousCity() {
    var city = localStorage.getItem('previousCity');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then(res => res.json()).then(data => {
       
    document.querySelector("input").value = city;
    getWeatherData(data);
})
}


//  current weather function

function getWeatherData (data) {

       let latitude = data.coord.lat
       let longitude = data.coord.lon

       let city = document.querySelector("input").value;
    
       fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${apiKey}`).then(res => res.json()).then(data => {
       console.log(data)
       showWeatherData(city, data);
       showForecast(data);
       })
   }


// display current weather function

function showWeatherData(city, data) {
  
    const { temp, humidity, wind_speed, uvi } = data.current;
    const { icon, description } = data.current.weather[0];
    
    document.querySelector(".city").innerText = "Weather in " + city;
    
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
    
    document.querySelector(".description").innerText = description;
    
    document.querySelector(".temp").innerText = temp + "°F";
    
    document.querySelector(".humidity").innerText =
    "Humidity: " + humidity + "%";
    
    document.querySelector(".wind").innerText =
    "Wind speed: " + wind_speed + "mph";
    
    document.querySelector(".uvindex").innerText = "UV Index: " + uvi;

    if(uvi > 7) {
        document.querySelector(".uvindex").classList.add("high");
        console.log("high");
    } 
    else if(uvi >= 4) {
        document.querySelector(".uvindex").classList.add("moderate");
        console.log("moderate");
    }
    else {
        document.querySelector(".uvindex").classList.add("low");
        console.log("low");
    }

 }


// 5 day forecast function 

function showForecast(data) {

    // day 1  
    
        var icon = data.daily[0].weather[0].icon;
        var temp = data.daily[0].temp.day;
        var humidity = data.daily[0].humidity;
        var wind_speed = data.daily[0].wind_speed;
        
        document.querySelector("#forecastIcon1").src = "http://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector("#forecastTemp1").innerText = temp + "°F";

        document.querySelector("#forecastHumidity1").innerText = "Humidity: " + humidity + "%";

        document.querySelector("#forecastWind1").innerText = "Wind: " + wind_speed + "mph";
                  
        
    // day 2
    
        var temp = data.daily[1].temp.day;
        var humidity = data.daily[1].humidity;
        var wind_speed = data.daily[1].wind_speed;
        var icon = data.daily[1].weather[0].icon;

        document.querySelector("#forecastIcon2").src = "http://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector("#forecastTemp2").innerText = temp + "°F";

        document.querySelector("#forecastHumidity2").innerText = "Humidity: " + humidity + "%";

        document.querySelector("#forecastWind2").innerText = "Wind: " + wind_speed + "mph";
                
        
    // day 3 
            
        var temp = data.daily[2].temp.day;
        var humidity = data.daily[2].humidity;
        var wind_speed = data.daily[2].wind_speed;
        var icon = data.daily[2].weather[0].icon;
    
        document.querySelector("#forecastIcon3").src = "http://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector("#forecastTemp3").innerText = temp + "°F";

        document.querySelector("#forecastHumidity3").innerText = "Humidity: " + humidity + "%";

        document.querySelector("#forecastWind3").innerText = "Wind: " + wind_speed + "mph";
   
    
    // day 4
    
        var temp = data.daily[3].temp.day;
        var humidity = data.daily[3].humidity;
        var wind_speed = data.daily[3].wind_speed;
        var icon = data.daily[3].weather[0].icon;
    
        document.querySelector("#forecastIcon4").src = "http://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector("#forecastTemp4").innerText = temp + "°F";

        document.querySelector("#forecastHumidity4").innerText = "Humidity: " + humidity + "%";

        document.querySelector("#forecastWind4").innerText = "Wind: " + wind_speed + "mph";

    
    // day 5
    
        var temp = data.daily[4].temp.day;
        var humidity = data.daily[4].humidity;
        var wind_speed = data.daily[4].wind_speed;
        var icon = data.daily[4].weather[0].icon;

        document.querySelector("#forecastIcon5").src = "http://openweathermap.org/img/wn/" + icon + ".png";

        document.querySelector("#forecastTemp5").innerText = temp + "°F";

        document.querySelector("#forecastHumidity5").innerText = "Humidity: " + humidity + "%";

        document.querySelector("#forecastWind5").innerText = "Wind: " + wind_speed + "mph";
}
