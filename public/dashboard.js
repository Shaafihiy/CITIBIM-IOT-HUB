
let tempData = [];
let luxData = [];
let labels = [];


const tempChart =
new Chart(
document.getElementById("temperatureChart"),
{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Temperature °C",

data:tempData

}]

}

});



const luxChart =
new Chart(
document.getElementById("luxChart"),
{

type:"line",

data:{

labels:labels,

datasets:[{

label:"Solar Radiation lux",

data:luxData

}]

}

});





async function updateDashboard(){


try{


const response =
await fetch("/api");


const data =
await response.json();



document.getElementById("temperature")
.innerHTML =
data.dht_temp+" °C";



document.getElementById("humidity")
.innerHTML =
data.dht_hum+" %";



document.getElementById("pressure")
.innerHTML =
data.pressure+" Pa";



document.getElementById("lux")
.innerHTML =
data.lux+" lux";



document.getElementById("gsm")
.innerHTML =
data.gsm;



document.getElementById("satellite")
.innerHTML =
data.sat;



document.getElementById("connectionStatus")
.innerHTML =
"🟢 Online";



document.getElementById("lastUpdate")
.innerHTML =
"Last Update: "
+new Date().toLocaleTimeString();



labels.push(
new Date().toLocaleTimeString()
);



tempData.push(
data.dht_temp
);



luxData.push(
data.lux
);



if(labels.length>20){

labels.shift();

tempData.shift();

luxData.shift();

}



tempChart.update();

luxChart.update();




}

catch(error){


document.getElementById("connectionStatus")
.innerHTML =
"🔴 Offline";


console.log(error);


}



}



setInterval(
updateDashboard,
5000
);


updateDashboard();
