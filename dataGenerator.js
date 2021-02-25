const faker = require('faker');
const fs = require('fs');

var data = {};
var dataArray = [];

for(let i=0; i<1000; i++){
data.id = i;
data.name = faker.name.findName();
data.location_latitude = parseInt(faker.address.latitude());
data.location_longitude = parseInt(faker.address.longitude());
dataArray[i] = {...data};
}

fs.writeFile(`${__dirname}/data.json`, JSON.stringify(dataArray), (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});