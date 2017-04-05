// data.js
// Pulls data from the API and draws it on the page

let json = null;
let jsonTransactions = null;


// const apiURL = "http://community.dur.ac.uk/vivek.a.mehta/redtoblack/api.php";
const apiURL = "http://localhost:8888/api/api.php";


// (function(){
    $.getJSON(apiURL + "?action=weeklySpend&userID=1",function(data){
      json = data;
      console.log('json',json);
    });
// })();


var getLeisureSpend = function()
{
  return json.leisure;
  // return {
  //   "limit": 100,
  //   "spend": 70
  // }
}

var getFoodSpend = function()
{
  return json.food;
  // return {
  //   "limit": 100,
  //   "spend": 20
  // }
}

var getTravelSpend = function()
{
  return json.travel;
  // return {
  //   "limit": 20,
  //   "spend": 10
  // }
}

var getBillsSpend = function()
{
  return json.bills;
  // console.log("bills",json.bills);
  // return {
  //   "phone": {
  //     "expectedOut": 25,
  //     "status": "okay"
  //   },
  //   "rent": {
  //     "expectedOut": 90,
  //     "status": "okay"
  //   },
  //   "utilities": {
  //     "expectedOut": 12,
  //     "status": "okay"
  //   }
  // }
}

var setBlackOrRed = function(colour){
  json.blackOrRed = colour;
}

var getBlackOrRed = function()
{
  return json.blackOrRed;
}

var getSavingsStatus = function()
{
  return {
    "status": "black",
    "canBeSaved": 20
  }
}


// Get transactions
// (function(){
    jsonTransactions = {};

    $.getJSON(apiURL + "?action=transactions&requestType=3",function(data){
      jsonTransactions.food = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=1",function(data){
      jsonTransactions.leisure = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=2",function(data){
      jsonTransactions.travel = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=4",function(data){
      jsonTransactions.bills = data;
    });
    console.log('jsonTransactions',jsonTransactions);
// });


var getTransactions = function(){
  if(jsonTransactions == {}){
    $.getJSON(apiURL + "?action=transactions&requestType=3",function(data){
      jsonTransactions.food = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=1",function(data){
      jsonTransactions.leisure = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=2",function(data){
      jsonTransactions.travel = data;
    });

    $.getJSON(apiURL + "?action=transactions&requestType=4",function(data){
      jsonTransactions.bills = data;
    });
  }
  return jsonTransactions;
}
