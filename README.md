# Fitness Freaks App


## Table of Contents
* [About](#about-fitness-freaks)
* [Project Walkthrough](#fitness-freaks-Video)
* [Technologies](#technologies)
* [Link](#link)
* [Install](#install)
* [Usage](#usage)
* [Run Tests](#runt-tests)
* [Framework](#framework)
* [Backend Dependencies](#dependencies)
* [Code Examples](#code-examples)
* [Features](#features)
* [To-Do List](to-do-list)
* [Status](#status)
* [Created BY](#contact)
* [License](#license&#x1F4D9;)

## About Fitness Freaks
Fitness Freaks is an application that has multiple features. We can calculate the BMI of the user and suggest the user some good recipes and tips to maintain the healthy body weight.

## Project Walkthrough
[Demo Video](https://youtu.be/Nu4lAOmi1BU)

## Technologies
JavaScript

HTML / CSS

## Link
[https://myfitness-freakapp.herokuapp.com]

## Install 
npm install

## Usage
npm run start

## Run Tests
npm run test

## Framework
Expressjs

## Backend Dependencies
npm i express cors 
npm i path
npm i axios

## Code Examples

```
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

```

## Fitness Freaks Features
* Multiple Views
* Calculates BMI
* Alert the User about being Underweight, Overweight or Healthy weight
* Suggest recipes

## To-Do List:
* Input Weight in pounds
* Input Height in inches

## Status
Completed

## Created By
Jagruti Depan<br/>(https://www.linkedin.com/in/jags-depan-2a814121b/)
(https://github.com/jagsdep/FitnessFreak#technologies)

## License 

View Bellow<br/>
(https://choosealicense.com/licenses/gpl-3.0/)











