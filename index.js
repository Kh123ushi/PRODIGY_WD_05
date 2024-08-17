let search = document.getElementById("search");
let city = document.getElementsByClassName("city")[0];
let temp = document.getElementsByClassName("temp")[0];
let description = document.getElementsByClassName("description")[0];
let clouds = document.getElementsByClassName("clouds")[0];
let humidity = document.getElementsByClassName("humidity")[0];
let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (search.value != "") {
    searchWeather(search.value);
  }
});

const searchWeather = function (cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5c974fb19fa016bfaecf232c1f12f795&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.cod == 200) {
        city.querySelector("p").innerText = data.name;

        // Update the temperature and description
        temp.querySelector("span").innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;

        // Update the clouds and humidity
        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;

        // Update the weather icon
        temp.querySelector("img").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        // Update the country flag
        let flagImg = city.querySelector("img");
        if (!flagImg) {
          flagImg = document.createElement("img");
          city.appendChild(flagImg);
        }
        flagImg.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
      } else {
        alert("City not found!");
      }
    })
    .catch(error => console.error("Error fetching data:", error));
};
