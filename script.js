const wrapper = document.querySelector(".wrapper");

let weather_icon = document.getElementById('weather-icon');
let temperature = document.getElementById("temperature");
let input = document.getElementById("input");
let btn = document.querySelector(".btn");
let inner1 = document.querySelector(".location");
let inner3 = document.querySelector(".numb-2");
let inner4 = document.querySelector(".humidity span");
let description = document.querySelector(".weather")
let arrowBack = document.querySelector("body > div > header > i")


const cities = document.getElementById("cities")

let api_key = "0fd7f7019c5c42a49fa104303221507"

function handleOnChange(e) {
    if(e.value.length >= 3){
    let url = `http://api.weatherapi.com/v1/search.json?key=${api_key}&q=${e.value}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            for(let i=0; i<data.length; i++){
                city = data[i].name
                city_display = city +", "+ data[i].region
                console.log(city)
                cities.innerHTML+=`<option value="${city}">${city_display}</option>`
            }
        })
    }
}

btn.addEventListener("click", () => {
    if(input.value != null){
    temperature.innerText = "Data Fetching....";
    // temperature.style.fontSize = "10px";

    let cityname = input.value;

    let url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cityname}`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            // console.log(data);
            let temp = data.current.temp_c;
            temperature.innerText = temp;
            temperature.style.color = "black";
            temperature.style.fontWeight = "500";
            weather_icon.src = "http:"+data.current.condition.icon

            inner1.innerText = data.location.name +", "+ data.location.country;
            inner3.innerText = data.current.feelslike_c;
            inner4.innerText = data.current.humidity;
            // inner5.innerText = 'Wind Speed: ' + data.current.wind_kph + " KPH";
            description.innerText = data.current.condition.text;
            wrapper.classList.add("active");
        })
    }
    else{
        window.alert("Please input the city name.")
    }
})

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});