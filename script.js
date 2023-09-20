const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'

const place_name = 'Мытищи'

function receiveJson_place(API_KEY_YANDEX, place_name) {
    return fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`)
        .then(response => response.json())
}

function receiveJson_meteo(coordinates) {
    return fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`)
        .then(response => response.json())
}

function createNode(element) {
    return document.createElement(element)
}

function append(parent, el) {
    return parent.appendChild(el)
}

function deploy_html(data_time, data_p2_5, data_p10_) {

    console.log('Time of measure ==== ', data_time)
    console.log('Concentration at PM2_5  ==== ', data_p2_5)
    console.log('Concentration at PM10   ==== ', data_p10_) 

    const ul = document.getElementById('airpollution')

    for(let i = 0; i < 120; i++) {

        let li   = createNode('li')
        let hr   = createNode('hr')
        let span = createNode('span')
    
        span.innerHTML = `Time : ${data_time[i]} ;   Concentration avr 2,5 hours :   ${data_p2_5[i]} ;    Concentration avr 10 hours : ${data_p10_[i]} ;`

        append(ul, li)
        append(li, span)
        append(li, hr)
    }
} 

function canvas_html(date__daily, pm2_5_daily, pm10__daily) {

    console.log('Daily average concentration at PM2_5  ==== ', pm2_5_daily)
    console.log('Daily average concentration at PM10_  ==== ', pm10__daily)
    console.log('Daily date                            ==== ', date__daily)

// Set canvas-element 'ctx_one' as sutable for 2D-drawing
    const ctx_one = document.getElementById('canvas_one').getContext('2d')

// First Graph   
// Drawing of X- and Y- axes
    ctx_one.fillStyle = "black";                            // Set of 'black' color of lines 
    ctx_one.lineWidth = 1.0;                                // Set width of lines equal 1px
    
    ctx_one.beginPath();                                    // Start
    ctx_one.moveTo(50, 50);                                 // Start point
    ctx_one.lineTo(50, 550);                                // Draw of Y-axe
    ctx_one.lineTo(550, 550);                               // Draw of X-axe
    ctx_one.stroke();                                       // Confirm 

// Setting of color of lines and size of text
    ctx_one.fillStyle = "black";
    ctx_one.font = "16px serif";
    ctx_one.fillText('Daily average air pollution at pm 2,5', 175, 25);

// Print data on Y-axis
    for(let i = 0; i < date__daily.length + 1; i++) { 
        ctx_one.fillText((5 - i) * 4 + "", 10, i * 100 + 50 + 5); 
        ctx_one.beginPath(); 
        ctx_one.moveTo(40, i * 100 + 50); 
        ctx_one.lineTo(50, i * 100 + 50); 
        ctx_one.stroke(); 
    }
 
// Print date on X-axis
    ctx_one.font = "16px serif";
    for(let i = 0; i < date__daily.length; i++) { 
        ctx_one.fillText(date__daily[i], 75 + i * 100, 550 + 20); 
    }

// Setting of 'green' color for columns 
    ctx_one.fillStyle = "green"; 
// Цикл для от рисовки графиков
    for(let i = 0; i < pm2_5_daily.length; i++) { 
        let dp = pm2_5_daily[i] * 25; 
        ctx_one.fillRect(75 + i * 100, 550 - dp , 75, dp); 
    }

// Second Graph
// Drawing of X- and Y- axes 
    ctx_one.fillStyle = "black"; 
    ctx_one.lineWidth = 1.0; 
    ctx_one.beginPath(); 
    ctx_one.moveTo(650, 50); 
    ctx_one.lineTo(650, 550);
    ctx_one.lineTo(1150, 550); 
    ctx_one.stroke(); 

// Setting of color of lines  and size of text
    ctx_one.fillStyle = "black";
    ctx_one.font = "16px serif";
    ctx_one.fillText('Daily average air pollution at pm 10', 600 + 175, 25);

// Print data on Y-axis
    for(let i = 0; i < date__daily.length + 1; i++) { 
        ctx_one.fillText((5 - i) * 8 + "", 600 + 10, i * 100 + 50 + 5); 
        ctx_one.beginPath(); 
        ctx_one.moveTo(600 + 40, i * 100 + 50); 
        ctx_one.lineTo(600 + 50, i * 100 + 50); 
        ctx_one.stroke(); 
    }

// Print date on X-axis
    ctx_one.font = "16px serif";
    for(let i = 0; i < date__daily.length; i++) { 
        ctx_one.fillText(date__daily[i], 600 + 75 + i * 100, 550 + 20); 
    }

// Setting of 'green' color for columns 
    ctx_one.fillStyle = "green"; 
// Цикл для от рисовки графиков
    for(let i = 0; i < pm10__daily.length; i++) { 
        let dp = pm10__daily[i] * 12.5; 
        ctx_one.fillRect(600 + 75 + i * 100, 550 - dp , 75, dp); 
    }


// Set canvas-element 'ctx_two' for 'chart.js' using
    const ctx_two = document.getElementById('canvas_two')    

    new Chart(ctx_two, {
        type: 'bar',
        data: {
            labels:     date__daily,
            datasets:   [{
                label:  'Daily average air polllution at pm 2,5',
                data:   pm2_5_daily,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

// Set canvas-element 'ctx_two' for 'chart.js' using
    const ctx_tri = document.getElementById('canvas_tri')    

    new Chart(ctx_tri, {
        type: 'bar',
        data: {
            labels:     date__daily,
            datasets:   [{
                label:  'Daily average air polllution at pm 10',
                data:   pm10__daily,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



}

receiveJson_place(API_KEY_YANDEX, place_name)
.then(function(data) {

//    console.log('data ==== ', data)

    let sitelocationString = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

//    console.log('sitelocationString ==== ', sitelocationString)
//    console.log(typeof(sitelocationString))
    
// Here place for convertation of string sitelocationString to latitude and longitude    

    let coordinates = new Array(2)
    coordinates = sitelocationString.split(' ')

    console.log(coordinates)
    console.log('latitude ==== ', coordinates[0], 'longitude ==== ', coordinates[1])

    return receiveJson_meteo(coordinates) 
           
})

.then(function(data) {

    console.log('data ==== ', data)
 
    let pollutionStream = data.hourly

    console.log('pollution ==== ', pollutionStream)

    let time_of_measure = data.hourly.time
    let concentration_P2_5 = data.hourly.pm2_5
    let concentration_P10_ = data.hourly.pm10

    console.log('Time of measure ==== ', time_of_measure)
    console.log('Concentration at PM2_5  ==== ', concentration_P2_5)
    console.log('Concentration at PM10   ==== ', concentration_P10_) 

    let PM2_5_daily = new Array(5)
    let PM10__daily = new Array(5)
    let date__daily = new Array(5)

    for (let i = 0; i < 5; i++) {

        PM2_5_daily[i] = 0
        PM10__daily[i] = 0
        date__daily[i] = ''

        for (let j = 0; j < 23; j++) {
            PM2_5_daily[i] = PM2_5_daily[i] + (data.hourly.pm2_5[i * 24 + j]) / 24
            PM10__daily[i] = PM10__daily[i] + (data.hourly.pm10[i * 24 + j])  / 24          
        }

        date__daily[i] = data.hourly.time[i * 24].substring(0,10)

    }

    console.log('Daily average concentration at PM2_5  ==== ', PM2_5_daily)
    console.log('Daily average concentration at PM10_  ==== ', PM10__daily)
    console.log('Daily date                            ==== ', date__daily)


//    return  deploy_html(time_of_measure, concentration_P2_5, concentration_P10_)

    return  canvas_html(date__daily, PM2_5_daily, PM10__daily)

})

.catch(function(error) {
    console.log(error)
})