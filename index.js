//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.set("view engine",'ejs');
app.use(express.static("static"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    var today = new Date();
    var day = "";
    res.write(String(today.getDay()));
    if(today.getDay() == 6 || today.getDay() ==0){
        day = "Weekend";
    }
    else
    day = "Week day"
    res.render("list",{day:day});
})

app.get("/api",function(req,res){
    // console.log(req);
    const url = "https://v2.jokeapi.dev/joke/Programming";
    https.get(url,function(resposne){
        console.log(resposne.statusCode);
        resposne.on('data',function(data){
            // console.log(data);
            const apidata = JSON.parse(data);
            // console.log(apidata);
            console.log(apidata.error);
            res.write(JSON.stringify(apidata));
            res.write("ncsja");
            res.send();
        })
    })
    // res.sendFile(__dirname + "/index.html");
})

app.get("/calculator",function(req,res){
    // console.log(req);
    
    res.sendFile(__dirname + "/calculator.html");
})

app.post("/calculator",function(req,res){
    //body-parser
    console.log(req.body); 
    res.send("ans " + (Number(req.body.num1) + Number(req.body.num2)));
})



app.get("/abc",function(req,res){
    res.send("fndsjfnruigbr");
})



app.listen(3000, function(){
    console.log("Server started on port 3000!");
});
