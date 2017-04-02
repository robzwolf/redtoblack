// script.js

PROGRESS_BAR_DRAW_TIME = 800;
PROGRESS_BAR_COLOUR = '#5A82A5';
GLOBAL_SCREEN_TRANSITION_FADE_TIME = 300;
currentScreen = "home";

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
        color: PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  leisurebar.animate(value);
}

/* Draw the food progress bar with a value on a scale from 0 to 1 */
var drawFoodBar = function(value)
{
  var foodbar = new ProgressBar.Line('#progress-food', {
        color: PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  foodbar.animate(value);
}

/* Draw the travel progress bar with a value on a scale from 0 to 1 */
var drawTravelBar = function(value)
{
  var travelbar = new ProgressBar.Line('#progress-travel', {
        color: PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  travelbar.animate(value);
}


var transitionToScreen = function(screen){
  if(currentScreen != screen)
  {
    $("main").fadeOut(GLOBAL_SCREEN_TRANSITION_FADE_TIME);
    setTimeout(function(){$("main#" + screen).fadeIn(GLOBAL_SCREEN_TRANSITION_FADE_TIME);},GLOBAL_SCREEN_TRANSITION_FADE_TIME);
    currentScreen = screen;
  }

}


$(document).ready(function(){

  // Initial set-up and drawing progress bars

  var food = getFoodSpend();
  var leisure = getLeisureSpend();
  var travel = getTravelSpend();
  var bills = getBillsSpend();
  var savingsStatus = getSavingsStatus();
  console.log(savingsStatus);
  console.log(savingsStatus.status);

  var totalBillsExpectedOut = 0;
  $.each(bills,function(elem,value){
    totalBillsExpectedOut += value.expectedOut;
  });

  drawLeisureBar(leisure.spend/leisure.limit);
  drawFoodBar(food.spend/food.limit);
  drawTravelBar(travel.spend/travel.limit);

  $("#expected-out-text").text(totalBillsExpectedOut);

  if(savingsStatus.status === "black"){
    $("#savings-text").html('You can save £<span id="can-be-saved-text">' + savingsStatus.canBeSaved + '</span>.');
  }
  else if(savingsStatus.status === "red"){
    $("#savings-text").html('You do not have enough spare income to save.');
  }


  // Event listeners
  $("#savings-footer").click(function(){
    transitionToScreen("savings");
  });
  $("header").click(function(){
    transitionToScreen("home");
  })
  $("next-1").click(function(){
    transitionToScreen("welcome-2");
  })

});
