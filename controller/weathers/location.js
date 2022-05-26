/* `https://nominatim.openstreetmap.org/search?format=json&q=اليمن,+الحديدة+برع+البعيمي`*/



/* const express = require('express');
const app = express();
app.use(express.static('public'));
//app.use(json());
//app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
    res.json('najeebaslan')
    console.log('najeeb');
})

app.listen(3000, function () {
	console.log('http://localhost:3000/');
});
console.log('najeeb'); */
new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);
  
  }).then(function(result) {
  
    alert(result); // 1
  
    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) { // (**)
  
    alert(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    alert(result); // 4
  
  });