// script.js

var setGlobalGood = function()
{
  $("html").removeClass("global-bad").addClass("global-good");
  $("#finance-status").text("You are doing well.");
};

var setGlobalBad = function()
{
  $("html").removeClass("global-good").addClass("global-bad");
  $("#finance-status").text("You are overspending.");
}

$(document).ready(function(){

});

var getLatestData = function()
{

};

/* Draw the leisure progress bar with a value on a scale from 0 to 1 */
var drawLeisureBar = function(value)
{
  var leisurebar = new ProgressBar.Line('#progress-leisure', {
        color: '#5A82A5',
        duration: 800,
        easing: 'easeInOut'
  });
  leisurebar.animate(value);
}

/* Draw the food progress bar with a value on a scale from 0 to 1 */
var drawFoodBar = function(value)
{
  var foodbar = new ProgressBar.Line('#progress-food', {
        color: '#5A82A5',
        duration: 800,
        easing: 'easeInOut'
  });
  foodbar.animate(value);
}

/* Draw the travel progress bar with a value on a scale from 0 to 1 */
var drawTravelBar = function(value)
{
  var travelbar = new ProgressBar.Line('#progress-travel', {
        color: '#5A82A5',
        duration: 800,
        easing: 'easeInOut'
  });
  travelbar.animate(value);
}



$(document).ready(function(){

  var food = getFoodSpend();
  var leisure = getLeisureSpend();
  var travel = getTravelSpend();
  var bills = getBillsSpend();
  var savingsStatus = getSavingsStatus();

  var totalBillsExpectedOut = 0;
  $.each(bills,function(elem,value){
    totalBillsExpectedOut += value.expectedOut;
  });

  drawLeisureBar(leisure.spend/leisure.limit);
  drawFoodBar(food.spend/food.limit);
  drawTravelBar(travel.spend/travel.limit);

  $("#expected-out-text").text(totalBillsExpectedOut);

  if(savingsStatus.status = "black"){
    $("#savings-text").html('You can save £<span id="can-be-saved-text">' + savingsStatus.canBeSaved + '</span>.');
  }


});
