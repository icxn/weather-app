window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    // console.log(temperatureDegree);

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/767319d0ecf25c4461966d0a71f888fe/${lat},${long}`;
            // const api = `${proxy}https://api.darksky.net/forecast/767319d0ecf25c4461966d0a71f888fe/51.879650,-0.417560`;

            fetch(api)
            .then(response =>{
                return response.json();
                console.log(response);
            })
            .then(data => {
                // console.log(data);
                const { temperature, summary, icon } = data.currently;

                // console.log(data.currently);
                
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    //FORMULA for Celcius
                    let celcius = (temperature - 32) * (5 / 9);
                //set Icon
                    setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Celcius/Fahrenheit
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";  
                            temperatureDegree.textContent = temperature;
                        }
                    });
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currenctIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currenctIcon]);
    }


});
