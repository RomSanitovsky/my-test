const fs = require('fs');
const express = require('express');
const cors = require('cors');


const PORT=3000;

const app = express();



app.use(express.urlencoded({ extended: true}));

const users = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

app.get('/',(req,res,next)=>{
    res.locals.docsJSON = JSON.stringify(users);
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/markers',(req,res,next)=>{
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, ()=>{
    console.log('SERVER IS RUNNING!');
})

