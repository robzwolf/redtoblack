// data.js
// Pulls data from the API and draws it on the page

// THE FOLLOWING FUNCTIONS RETURN DUMMY DATA

var getLeisureSpend = function()
{
  return {
    "limit": 100,
    "spend": 70
  }
}

var getFoodSpend = function()
{
  return {
    "limit": 100,
    "spend": 20
  }
}

var getTravelSpend = function()
{
  return {
    "limit": 20,
    "spend": 10
  }
}

var getBillsSpend = function()
{
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
