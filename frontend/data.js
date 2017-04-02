// data.js
// Pulls data from the API and draws it on the page

json = null;

$.getJSON("http://community.dur.ac.uk/vivek.a.mehta/redtoblack/api.php?action=weeklySpend&userID=1",function(data){
  json = data;
});

// THE FOLLOWING FUNCTIONS RETURN DUMMY DATA

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
  // return json.bills;
  console.log("bills",json.bills);
  return {
    "phone": {
      "expectedOut": 25,
      "status": "okay"
    },
    "rent": {
      "expectedOut": 90,
      "status": "okay"
    },
    "utilities": {
      "expectedOut": 12,
      "status": "okay"
    }
  }
}

var getSavingsStatus = function()
{
  return {
    "status": "black",
    "canBeSaved": 20
  }
}
