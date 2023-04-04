const card = document.querySelector(".card");

//TEMP BOX
const tempBox = document.querySelector(".temp-box");
const weatherIcon = document.querySelector(".weather-icon img");
const currentTemp = document.querySelector(".current-temp");
const descriptionDisplay = document.querySelector(".description");
const locationResponseIcon = document.querySelector(".location-response-icon");
const locationResponseName = document.querySelector(".location-response-name");
const weatherDetails = document.querySelector(".weather-details");


//ERROR BOX
const errorBox = document.querySelector(".error-box");
const errorIcon = document.querySelector(".error-icon");
const errorMessage = document.querySelector(".error-message");

//SEARCH BUTTON CLICK EVENT
const searchButton = document.querySelector(".search");
searchButton.addEventListener("click", search);
//SEARCH INPUT ENTER KEYPRESS EVENT
const searchInput = document.querySelector(".search-bar input");
searchInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        search();
    }
})

function search() {
    //RESET
    errorBox.style.display = "none";
    tempBox.style.display = "none";

    //GET CITY NAME FROM INPUT
    const cityName = document.querySelector(".search-bar input").value;
    if (cityName === '') {
        card.style.height = "128px";
        return;
    }

    //CALL API 
    const apiKey = "bee201a8f14c65c21d8d9c06a5e3eab7"
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiCall)
        .then(response => response.json())
        .then(
            result => {
                console.log(result);

                //IF ERROR
                if (result.cod == '404') {
                    errorBox.style.display = "flex";
                    card.style.height = "385px"

                    errorIcon.classList.add("grow-in");
                    errorMessage.classList.add("grow-in");
                    return;
                }

                //IF SUCCESS
                tempBox.style.display = "flex";
                card.style.height = "720px";

                weatherIcon.classList.add("slide-in")
                currentTemp.classList.add("grow-in");
                descriptionDisplay.classList.add("grow-in");
                locationResponseIcon.classList.add("grow-in");
                locationResponseName.classList.add("grow-in");
                weatherDetails.classList.add("grow-in");


                //GET WEATHER INFO
                const city = result.name;
                const country = result.sys.country;
                const { description, id } = result.weather[0];
                const { temp, humidity } = result.main;
                const windSpeed = result.wind.speed;

                //PASS VALUES TO HTML ELEMENT
                document.querySelector(".current-temp .num").innerText = Math.round(temp);
                document.querySelector(".description").innerText = description;
                document.querySelector(".location-response-name").innerText = `${city}, ${country}`;
                document.querySelector(".humidity").innerText = humidity + "%";
                document.querySelector(".wind-speed").innerText = windSpeed + " m/s";

                if (id === 800) {
                    weatherIcon.src = "./image/clear.svg";
                }
                else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
                    weatherIcon.src = "./image/rain.svg";
                }
                else if (id >= 600 && id <= 622) {
                    weatherIcon.src = "./image/snow.svg";
                }
                else if (id >= 701 && id <= 781) {
                    weatherIcon.src = "./image/storm.svg";
                }
                else if (id >= 801 && id <= 804) {
                    weatherIcon.src = "./image/cloud.svg";
                }
            }
        )
}