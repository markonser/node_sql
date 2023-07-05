const personalMistakeListDb = require('./db-personal-mistake-list.js');
const axios = require('axios');


for (let i = 0; i < personalMistakeListDb.skisov.length; i++) {

axios.post('http://localhost:3002/mistakes',
  personalMistakeListDb.skisov[i],
  function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });

}
