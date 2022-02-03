
 const express = require('express')//want to use express pkg inside my backend js file
 const cors = require('cors')//set of rules how you allow computer to interact with
 const app = express()//import the express and assign it to the variable app. that way it can handle various request such as app.get request or app.post request 
 const path = require('path');//provides useful functionality to interact with the file
 //location of the files 
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 
 const mongoose = require('mongoose')
 mongoose.Promise = global.Promise;
 const User = require ('./model/user')
 const Profile = require ('./model/profile')

 const dbConfig = require('./config');
 const { response } = require('express');
//  const { Json } = require('sequelize/dist/lib/utils');
 console.log(dbConfig)
 mongoose.connect(dbConfig.config_url)
 mongoose.connection.on('connected', result => {
     console.log('connection is successful')

 } )
 mongoose.connection.on('error', result => {
    console.log('connection failed', result)

} )

const csv = require("csvtojson")

const jwt = require("jsonwebtoken");
const { config_url } = require('./config');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']  
    //const token = authHeader && authHeader.split(' ')[1]
    console.log('token',token);
    
    if (token == null) return res.sendStatus(401)
  
        jwt.verify(token, dbConfig.token_secret , (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
        
        console.log("user" , user);
        req.user = user
        next()
        })

}


 //to use middleware we call .use() on the express
 app.use(express.json()) //when we want to able to accept JSON
 app.use(cors())
 
 app.use(express.static("public"));//app.use executes express.static middleware to access files from the public folder via HTTP
 app.use(express.urlencoded({ extended: true }));//for parsing application/www-form -urlencoded

app.get('/', (req,res)=>{ // here the function is telling the server to ....... when a a request at the given route is called. Req, res is a callback function that listens the incoming request and responds to the client side, these objects are available in express framework
    console.log(path.join(__dirname));//returns the directory that is currently executing
   
 });

app.get('/input', (req,res)=>{ 
    res.sendFile(path.join(__dirname+'/public/input.html'));//locate my input.html files and sending it to the client side in response.
  
});

app.get('/csvBmiData', (req,res)=>{ 
   
    csv()
  .fromFile("bmi_data.csv")
  .then(jsonArrayObj => { //when parse finished, result will be emitted here.
     console.log(jsonArrayObj); 
     res.send({status:'success', data: jsonArrayObj})

   })

});

app.get('/profileBmiData', verifyToken, async (req,res)=>{
    console.log(req.user.user) 
    const profileDetails = await Profile.findOne({
        user: mongoose.Types.ObjectId(req.user.user)
    }).exec()
    console.log(profileDetails)
    res.send({status:'success', data:profileDetails});
    
   });

app.post('/bmi',verifyToken,async (req,res)=>{ //Add a BMI/calculated BMI
    console.log(req.user);
    var date = req.body.date;
    var age = req.body.age;
    var gender = req.body.gender;
    var weight=req.body.weight;
    var height=req.body.height;
    var temp=height*height;
    var BMI=(weight / temp)*703;

    if(!weight || !height){
        res.status(400).send('Enter the missing information')
    }else{
        const bodyMassIndex = {

            weight: weight,
            height: height,
            BMI: BMI,
            created_at:date
        }
        const profileDetails = {
            date: date,
            age: age,
            gender: gender
        }
        const userUpdate = await Profile.updateOne({user_id: mongoose.Types.ObjectId(req.user.user)},{$set:profileDetails})

        await Profile.updateOne({user_id: mongoose.Types.ObjectId(req.user.user)},{$push:{BMI:bodyMassIndex}})

        console.log('userUpdate', userUpdate);
        res.json({BMI:BMI});// send a JSON response
    }
   
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
app.get('/login', (req, res) =>{
    res.render("login")
})
app.post('/login', async(req, res) =>{
    console.log(req.body);
    const { username, password} = req.body
    if(!username|| typeof username !== 'string'){
        return res.json({status: 'error', error: 'Invalid Username'})  
        
    }
    if(!password || typeof password !== 'string'){
        return res.json({status:'error', error: 'Invalid Password'})
    }
    if(password.length < 5){
        return res.json({status:'error', error: 'Password too small has to be at least 6 character'})
    }

    const userObject = await User.findOne({'email': username, 'password': password})
    console.log(userObject);
    if (userObject){
        const payLoad = {
            user : userObject._id,
            info: 'fitnessFreaksUser'
        }
        const json = await jwt.sign(payLoad, dbConfig.token_secret)
        console.log(json);

        res.send({status:'ok', message: 'successfully logged in', token:json})
    }else{
        res.send({status:'failed', message: 'log in failed'})
    }

})
//showing register form
// app.get("/register", (req, res) =>{
//     res.render("register");
// })
//Handling user signup
app.post('/register', async(req, res) =>{
const email = req.body.email;
const password = req.body.password;
    console.log(req.body)
    if(!email || typeof email !== 'string'){
        return res.json({status: 'error', error: 'Invalid EmailID'})   
    }
    if(!password || typeof password !== 'string'){
        return res.json({status:'error', error: 'Invalid Password'})
    }
    if(password.length < 5){
        return res.json({status:'error', error: 'Password too small has to be at least 6 character'})
    }
    const myData =new User(req.body);
    myData.save().then(item => {
        console.log(JSON.stringify(item));
        console.log(item.id);
    const myProfile=new Profile({"user_id": item._id})
         myProfile.save().then(profileItem => {
            res.send({status:'success', message:'signed up successfully'});
            })
        })
        
        .catch(err => {
            console.log(err);
            res.status(400).send("failed")
        })

})
const PORT = process.env.PORT || 3000; //3000 is the port where the backend server would be running

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //starts the server on specified port
