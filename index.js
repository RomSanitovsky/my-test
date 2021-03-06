// In order to use app:

// 1. Generate random data using 'node dataGenerator.js' on console
// 2. import modules using 'npm i' in main directory
// 3. Run app by using 'nodemon index.js'


// API :
// use localhost:3000 to get main page. click on country name in order to get focused into coordinates in selected country. 
// click on 'get sorted users' to get list of sorted nearby users.

// use localhost:3000/markers to get all users markers on map.
// use localhost:3000/clusters to get clusters of users.

const fs = require('fs');
const express = require('express');
const cors = require('cors');

//this module calculates distance between 2 coordinates
const getDistance = require('./getDistance');

const PORT=3000;

const app = express();



app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Reading fake data
const users = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

//getting main root
app.get('/',(req,res,next)=>{
    res.sendFile(`${__dirname}/index.html`);
});

//getting markers
app.get('/markers',(req,res,next)=>{

    res.sendFile(`${__dirname}/markers.html`);
});

//getting clusters
app.get('/clusters',(req,res,next)=>{

    res.sendFile(`${__dirname}/clusters.html`);
});

//posting center coordinates and sending sorted nearby users
app.post('/getsorted' , (req,res,next)=> {
    
    const lat = req.body.lat;
    const lng = req.body.lng;
    const sortedUsers = users.map(el => {
        return {
            name: el.name,
            lat : el.location_latitude,
            lng : el.location_longitude,
            distance: getDistance(el.location_latitude, el.location_longitude, lat, lng)
        }
    });

    sortedUsers.sort((a,b)=> {
        return a.distance - b.distance;
    });

    res.send(sortedUsers);
});

//getting users data from server
app.get('/getusers',(req,res,next)=>{
    res.send(users);
});



app.listen(PORT, ()=>{
    console.log('SERVER IS RUNNING!');
})

