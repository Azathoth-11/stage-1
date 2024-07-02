const express = require('express')
const axios = require('axios')
const PORT = 3000;
const app = express();

const openWeatherMapApiKey = 'b39db0c631ed5b120b9f5b732956c258';

app.get("/", (req, res) => res.send("HELLO "));

app.get("/api/hello", async (req, res) => {
   let userId =  req.query.visitor_name;
   if (userId) {
     userId = userId.replace(/"/g, '');
    }
   console.log(userId);
    try{
       // const visitorIp = req.ip;
       const ip = await axios.get("https://api.ipify.org?format=json");
       const ipAddr = ip.data.ip;
       console.log(ipAddr);
       const response = await axios.get(`http://ip-api.com/json/${ipAddr}`);
      console.log(response)
       const city = response.data.city;
       console.log(city);

       const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherMapApiKey}`)
       const weatherData = weather.data;
       const temp = weatherData.main.temp;
       console.log(temp)

       res.json({
          "client_ip": `${req.ip}`,
          "location" : `${city}`,
          "greeting" : `Hello, ${userId}!, the temperature is ${temp} Celsius in ${city}`
    })
    }catch(error){
      res.status(500).send("Error in fetching data. Please Try Again Later......");
  };
});



app.listen(PORT, () => {
   console.log(`Server running in  ${PORT}`) 
});

module.exports = app;
