let id = "8a0a4448fdb9540fe45faef901e044a3";
let url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + id;

let input = document.querySelector("input");
let city = document.querySelector("#city");
let temperature = document.querySelector("#temperature");
let description = document.querySelector(".description");
let clouds = document.querySelector("#clouds");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    fetchWeather();
  }
});

async function fetchWeather() {
  try {
    let resp = await fetch(url + "&q=" + input.value);
    let data = await resp.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

function displayData(data) {
  if (data.cod == 200) {
    city.querySelector("figcaption").innerText = data.name;
    description.innerText = data.weather[0].description;
    temperature.querySelector("figcaption span").innerText = data.main.temp;
    clouds.innerText = data.clouds.all;
    humidity.innerText = data.main.humidity;
    pressure.innerText = data.main.pressure;
    city.querySelector("img").src =
      "https://flagsapi.com/" + data.sys.country + "/shiny/32.png";
      temperature.querySelector("img").src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png"
  } else {
    alert(data.message)
  }
}
