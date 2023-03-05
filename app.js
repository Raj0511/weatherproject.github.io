const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); 
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html"); 
});

app.post("/",function(req,res){
        const query = req.body.cityName;
        const apikey = "249a5d09eb47042e3c3dce16da211275";
        const unit = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;

    https.get(url,function(responce){
     
        responce.on("data",function(data){
        const wdata = JSON.parse(data);
        const temp = wdata.main.temp
        const description = wdata.weather[0].description
        const icon = wdata.weather[0].icon
        const iURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        
        res.write("<p style='font-size: 20px; margin-top: 200px; text-align: center'>The weather is currently " + description+"<p>");
        res.write("<h1 style=' font-size: 50px; text-align: center' >The Temprature in "+query+" is " + temp + " degree celcius.</h1>");
        // res.write("<img  style='color: white; align-items: center'src="+iURL+">");
        
        res.write("<video style='position: absolute; right: 0; bottom: 0; z-index: -1; 'autoplay loop muted plays-inline   src='/image/video.mp4' type='video/mp4'></video>");
        res.send();
        });
    });
});


app.listen(3000,function(){
    console.log("server is running on port 3000...");
})