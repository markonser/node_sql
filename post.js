const request = require('request');
const personalMistakeListDb = require('./db-personal-mistake-list.js');

// personalMistakeListDb.skisov.forEach(element => {

// const skisov = [
//   {
//     file: './pages/skisov/a1_33-1513_2014_ot_17.12.14.pdf',
//     delo: '33-1333/2014',
//     title: 'ошибочный вывод о наличии между наследниками спора о праве',
//     law: 'ст.ст. 55, 59-61, 67, ч. 3 ст. 263, ч. 1 ст. 264 ГПК РФ',
//   },
//   {
//     file: './pages/skisov/a3_2-14_2014_ot_27.08.2015.pdf',
//     delo: '2-14/2014',
//     title: 'ОТМЕНЕНО ПОЛНОСТЬЮ с вынесением НОВОГО. Не обнародовано',
//     law: '<span><mark>скрыто от народа</mark></span>',
//   }
// ];

for (let i = 0; i < personalMistakeListDb.skisov.length; i++) {

  request.post({
    url: 'http://localhost:3002/mistakes',
    body: personalMistakeListDb.skisov[i],
    json: true,
  }, function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode); 
    console.log('body:', body);
  });

}
