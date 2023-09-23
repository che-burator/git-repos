function convertTemperature(value, unit) {  
	if (unit === "Celsius") {    
		return value * 9 / 5 + 32;  } 
	else if (unit === "Fahrenheit") {    
		return (value - 32) * 5 / 9;  
	}}
    
//let select_temperature_value = document.getElementById("temperature-input");
//console.log(select_temperature_value);

//let select_temperature_units = document.getElementById("unit-select");
//console.log(select_temperature_units);

document.getElementById("temperature-input").addEventListener("change", function () { 
        
	const temperature = parseFloat(this.value);  
    console.log('Initial Temperature == ', temperature);

    document.getElementById("unit-select").addEventListener("change", function () {    

	    const unit = document.getElementById("unit-select").value;
        console.log('Measure unit == ', unit);

        const convertedTemperature = convertTemperature(temperature, unit);
        console.log('Converted Temperature == ', convertedTemperature);

        document.getElementById("result").textContent = convertedTemperature.toFixed(5);

    });

});




