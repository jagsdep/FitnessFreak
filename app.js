
 const express = require('express')//requiring the express imports the express 
 const cors = require('cors')//set of rules how you allow computer to interact with
 const app = express()//import the express and assign it to the variable app. that way it can handle various request such as app.get request or app.post request 
 const path = require('path');//provides useful functionality to interact with the file
 //location of the files 
 
 //to use middleware we call .use() on the express
 app.use(express.json())//for parsing application/JSONapp.use
 app.use(cors())
 
 app.use(express.static("public"));//app.use executes express.static middleware to access files from the public folder via HTTP
 app.use(express.urlencoded({ extended: true }));//for parsing application/www-form -urlencoded


app.get('/', (req,res)=>{ // here the function is telling the server to ....... when a a request at the given route is called. Req, res is a callback function that listens the incoming request and responds to the client side, these objects are available in express framework
    console.log(path.join(__dirname));//returns the directory that is currently executing
   
 });

app.get('/input', (req,res)=>{ 
    res.sendFile(path.join(__dirname+'/public/input.html'));
});

app.post('/bmi',(req,res)=>{ //Add a BMI/calculated BMI
    var weight=req.body.weight;
    var height=req.body.height;
    var temp=height*height;
    var BMI=(weight / temp)*703;
    res.json({BMI:BMI});// send a JSON response
});

app.post('/cal',(req,res)=>{ //route to handle the BMI calculation logics
    var weight=req.body.weight;
    var height=req.body.height;
    var temp=height*height;
    var BMI=(weight / temp)*703;
    console.log(BMI);

    if(BMI < 18.5){
        console.log("underweight");
        res.sendFile(path.join(__dirname+'/public/underweight.html'));
    }else if(BMI>25){
        console.log("overweight");
        res.sendFile(path.join(__dirname+'/public/overweight.html'));
    }else{
        console.log("healthy weight");
        res.sendFile(path.join(__dirname+'/public/healthy.html'));
    }
});

const PORT = process.env.PORT || 3000; //3000 is the port where the backend server would be running

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //starts the server on specified port
