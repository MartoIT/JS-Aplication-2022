function attachEvents() {
    let searchLocation = document.getElementById('location');
    let getWetherButton = document.getElementById('submit');
    getWetherButton.addEventListener('click', getWther);
    let codeLocation = '';
    let div = document.getElementById('forecast');
    let divCurrent = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');

    function getWther() {

        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then((body) => body.json())
            .then((result) => {
                
                divCurrent.textContent = '';
                upcomingDiv.textContent = '';

                result.forEach(element => {
                    if (element.name == searchLocation.value) {
                        codeLocation = element.code
                    }
                });

                fetch(`http://localhost:3030/jsonstore/forecaster/today/${codeLocation}`)
                    .then(body => body.json())
                    .then(result2 => {
                        div.style.display = 'block';
                        let name = result2.name;
                        let condition = result2.forecast.condition
                        let uper = result2.forecast.high
                        let lower = result2.forecast.low
                        let symbol = '';

                        if (condition == 'Sunny') {
                            symbol = '☀';
                        } else if (condition == 'Partly sunny') {
                            symbol = '⛅';
                        } else if (condition == 'Overcast') {
                            symbol = '☁';
                        } else {
                            symbol = '☂';
                        }

                        let divForecast = document.createElement('div');
                        divForecast.setAttribute('class', 'forecast');

                        let spanForSymbol = document.createElement('span');
                        spanForSymbol.setAttribute('class', 'condition symbol');
                        spanForSymbol.textContent = symbol;

                        let spanCondition = document.createElement('span');
                        spanCondition.setAttribute('class', 'condition');


                        let spanForName = document.createElement('span');
                        spanForName.setAttribute('class', 'forecast-data');
                        spanForName.textContent = name;

                        let spanTemperature = document.createElement('span');
                        spanTemperature.setAttribute('class', 'forecast-data');
                        spanTemperature.textContent = `${lower}°/${uper}°`;

                        let spanForCondtion = document.createElement('span');
                        spanForCondtion.setAttribute('class', 'forecast-data');
                        spanForCondtion.textContent = condition;

                        spanCondition.appendChild(spanForName);
                        spanCondition.appendChild(spanTemperature);
                        spanCondition.appendChild(spanForCondtion);
                        divForecast.appendChild(spanForSymbol);
                        divForecast.appendChild(spanCondition);

                        divCurrent.appendChild(divForecast)


                    })
                    
                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${codeLocation}`)
                    .then(body => body.json())
                    .then(result3 => {
                        result3.forecast.forEach(element => {
                            let condition = element.condition
                            let uper = element.high
                            let lower = element.low
                            let symbol = '';

                            let divForecastInfo = document.createElement('div');
                            divForecastInfo.setAttribute('class', 'forecast-info');
                            let spanUpcoming = document.createElement('span');
                            spanUpcoming.setAttribute('class', 'upcoming');

                            if (condition == 'Sunny') {
                                symbol = '☀';
                            } else if (condition == 'Partly sunny') {
                                symbol = '⛅';
                            } else if (condition == 'Overcast') {
                                symbol = '☁';
                            } else {
                                symbol = '☂';
                            }

                            let spanForSymbol = document.createElement('span');
                            spanForSymbol.setAttribute('class', 'symbol');
                            spanForSymbol.textContent = symbol;

                            let spanTemperature = document.createElement('span');
                            spanTemperature.setAttribute('class', 'forecast-data');
                            spanTemperature.textContent = `${lower}°/${uper}°`;

                            let spanForCondtion = document.createElement('span');
                            spanForCondtion.setAttribute('class', 'forecast-data');
                            spanForCondtion.textContent = condition;

                            spanUpcoming.appendChild(spanForSymbol);
                            spanUpcoming.appendChild(spanTemperature);
                            spanUpcoming.appendChild(spanForCondtion);
                            divForecastInfo.appendChild(spanUpcoming);
                            upcomingDiv.appendChild(divForecastInfo);

                        });

                    })
                    
            })
            .catch(err => {
                let divCurrent = document.getElementById('current');
                let upcomingDiv = document.getElementById('upcoming');
                Array.from(divCurrent.querySelectorAll(span)).forEach(span => span.remove());
                Array.from(upcomingDiv.querySelectorAll(span)).forEach(span => span.remove());

                let span = document.createElement('span');
                span.textContent = `Error`;

                divCurrent.appendChild(span);
            
            })

    }

}


attachEvents();