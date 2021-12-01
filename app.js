
 const express = require('express')
 const cors = require('cors')
 const app = express()
 const path = require('path');
 
 app.use(express.json())
 app.use(cors())
 
 app.use(express.static("public"));
 app.use(express.urlencoded({ extended: true }));


app.get('/', (req,res)=>{
    console.log(path.join(__dirname))
   
});

app.get('/input', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/input.html'));
});

app.post('/bmi',(req,res)=>{
    var weight=req.body.weight;
    var height=req.body.height;
    var temp=height*height;
    var BMI=(weight / temp)*703;
    res.json({BMI:BMI});
});

app.post('/cal',(req,res)=>{
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



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


