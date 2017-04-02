// script.js

const PROGRESS_BAR_DRAW_TIME = 800;
const PROGRESS_BAR_COLOUR = '#5A82A5';
const PROGRESS_BAR_RED_COLOUR = '#ee0000';
const GLOBAL_SCREEN_TRANSITION_FADE_TIME = 300;
let currentScreen = "home";

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

/* Draw the leisure progress bar with a value on a scale from 0 to 1 */
var drawLeisureBar = function(value,red)
{
  var leisurebar = new ProgressBar.Line('#progress-leisure', {
        color: red ? PROGRESS_BAR_RED_COLOUR : PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  leisurebar.animate(red ? 1 : value);
}

/* Draw the food progress bar with a value on a scale from 0 to 1 */
var drawFoodBar = function(value,red)
{
  var foodbar = new ProgressBar.Line('#progress-food', {
        color: red ? PROGRESS_BAR_RED_COLOUR : PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  foodbar.animate(red ? 1 : value);
}

/* Draw the travel progress bar with a value on a scale from 0 to 1 */
var drawTravelBar = function(value,red)
{
  var travelbar = new ProgressBar.Line('#progress-travel', {
        color: red ? PROGRESS_BAR_RED_COLOUR : PROGRESS_BAR_COLOUR,
        duration: PROGRESS_BAR_DRAW_TIME,
        easing: 'easeInOut'
  });
  travelbar.animate(red ? 1 : value);
}


var transitionToScreen = function(screen){
  if(currentScreen != screen)
  {
    $("main").fadeOut(GLOBAL_SCREEN_TRANSITION_FADE_TIME);
    setTimeout(function(){$("main#" + screen).fadeIn(GLOBAL_SCREEN_TRANSITION_FADE_TIME);},GLOBAL_SCREEN_TRANSITION_FADE_TIME);
    currentScreen = screen;
  }
}

var enterSetupMode = function(){
  $("html").addClass("setup");
  transitionToScreen("welcome-1");
}

var exitSetupMode = function(){

  //$("#welcome-4").fadeOut(GLOBAL_SCREEN_TRANSITION_FADE_TIME);
  setTimeout(function(){$("html").removeClass("setup");},GLOBAL_SCREEN_TRANSITION_FADE_TIME);
  transitionToScreen("home");
  setTimeout(function(){drawHome()},GLOBAL_SCREEN_TRANSITION_FADE_TIME*2);
}


var drawHome = function()
{
  // Initial set-up and drawing progress bars

  var food = getFoodSpend();
  var leisure = getLeisureSpend();
  var travel = getTravelSpend();
  var bills = getBillsSpend();
  // var savingsStatus = getSavingsStatus();

  /*var totalBillsExpectedOut = 0;
  $.each(bills,function(elem,value){
    totalBillsExpectedOut += value.expectedOut;
  });*/

  $("#last-week-bills-amount-text").text(bills.spend);

  leisure.spend = 0;
  food.spend = 0;
  travel.spend = 0;

  for(i=0;i<getTransactions().food.length;i++){
    food.spend += parseFloat(getTransactions().food[i].amount);
  }

  for(i=0;i<getTransactions().leisure.length;i++){
    leisure.spend += parseFloat(getTransactions().leisure[i].amount);
  }

  for(i=0;i<getTransactions().travel.length;i++){
    travel.spend += parseFloat(getTransactions().travel[i].amount);
  }

  leisureProportion = leisure.spend / leisure.limit;
  foodProportion = food.spend / food.limit;
  travelProportion = travel.spend / travel.limit;

  if(leisureProportion > 1){
    drawLeisureBar(leisureProportion,true);
  }else{
    drawLeisureBar(leisureProportion);
  }


  if(foodProportion > 1){
    setTimeout(function(){drawFoodBar(foodProportion,true);},PROGRESS_BAR_DRAW_TIME*.1);
  }else{
    setTimeout(function(){drawFoodBar(foodProportion);},PROGRESS_BAR_DRAW_TIME*.1);
  }

  if(travelProportion > 1){
    setTimeout(function(){drawTravelBar(travelProportion,true);},PROGRESS_BAR_DRAW_TIME*.2);
  }else{
    setTimeout(function(){drawTravelBar(travelProportion);},PROGRESS_BAR_DRAW_TIME*.2);
  }

  if(getBlackOrRed() === "black"){
    setGlobalGood();
    $("#savings-text").html('You can save <strong>£<span id="can-be-saved-text">' + json.amounttosave + '</span></strong>.');
    $("#save-amount-span").text(json.amounttosave);
  }else{ // === "red"
    setGlobalBad();
    $("#savings-text").html('You do not have enough spare income to save.');
  }

  // if(savingsStatus.status === "black"){
  //   $("#savings-text").html('You can save £<span id="can-be-saved-text">' + savingsStatus.canBeSaved + '</span>.');
  // }
  // else if(savingsStatus.status === "red"){
  //   $("#savings-text").html('You do not have enough spare income to save.');
  // }
}

var populateTransactions = function()
{

  // food
  for(var i=0;i<getTransactions().food.length;i++){
    console.log(getTransactions().food[i])
    $("#food-transactions tbody").append('<tr><td><div class="merchant"><h4>' + getTransactions().food[i].merchantName + '</h4></div><div class="date">' + getTransactions().food[i].transactionDate + '</div></td><td><div class="amount">£' + parseFloat(getTransactions().food[i].amount).toFixed(2) + '</div></td></tr>');
  }

  // leisure
  for(var i=0;i<getTransactions().leisure.length;i++){
    console.log(getTransactions().leisure[i])
    $("#leisure-transactions tbody").append('<tr><td><div class="merchant"><h4>' + getTransactions().leisure[i].merchantName + '</h4></div><div class="date">' + getTransactions().leisure[i].transactionDate + '</div></td><td><div class="amount">£' + parseFloat(getTransactions().leisure[i].amount).toFixed(2) + '</div></td></tr>');
  }

  // travel
  for(var i=0;i<getTransactions().travel.length;i++){
    console.log(getTransactions().travel[i])
    $("#travel-transactions tbody").append('<tr><td><div class="merchant"><h4>' + getTransactions().travel[i].merchantName + '</h4></div><div class="date">' + getTransactions().travel[i].transactionDate + '</div></td><td><div class="amount">£' + parseFloat(getTransactions().travel[i].amount).toFixed(2) + '</div></td></tr>');
  }

  // bills
  for(var i=0;i<getTransactions().bills.length;i++){
    console.log(getTransactions().bills[i])
    $("#bills-transactions tbody").append('<tr><td><div class="merchant"><h4>' + getTransactions().bills[i].merchantName + '</h4></div><div class="date">' + getTransactions().bills[i].transactionDate + '</div></td><td><div class="amount">£' + parseFloat(getTransactions().bills[i].amount).toFixed(2) + '</div></td></tr>');
  }

}

$(document).ready(function(){

  var incomeGroupCount = 1;

  enterSetupMode();


  // Event listeners
  $("#savings-footer").click(function(){
    transitionToScreen("savings");
  });
  $("header").click(function(){
    transitionToScreen("home");
  });
  $("#next-1").click(function(){
    transitionToScreen("welcome-2");
  });
  $("#next-2").click(function(){
    transitionToScreen("welcome-3");
    $("#slider-leisure").rangeslider();
    $("#slider-food").rangeslider();
    $("#slider-travel").rangeslider();
    $("#slider-bills").rangeslider();
    // $("input[type='range']").rangeslider();
  });
  $("#next-3").click(function(){
    transitionToScreen("welcome-4");
  });
  $("#next-4").click(function(){
    exitSetupMode();
  });


  $("#add-income").click(function(){
    // $('#income-form-group').insertAfter('<div class="income-group"><p>Income 2</p><input type="text" class="form-control" id="income-2-text" placeholder="name of income"><input type="text" class="form-control" id="income-2-value" placeholder="£..."></div>');
    incomeGroupCount += 1;
    $('#income-group-1').clone()
    .attr('id', 'income-group-'+incomeGroupCount)
    .insertBefore('.add-button');
    $('#income-group-'+incomeGroupCount+' p').html('Income '+incomeGroupCount);
    $('#income-group-'+incomeGroupCount+' .income-name').val('');
    $('#income-group-'+incomeGroupCount+' .income-value').val('');
  });
  $("#leisure-container").click(function(){
    transitionToScreen("leisure-breakdown");
  });
  $("#food-container").click(function(){
    transitionToScreen("food-breakdown");
  });
  $("#travel-container").click(function(){
    transitionToScreen("travel-breakdown");
  });
  $("#bills-cotainer").click(function(){
    transitionToScreen("bills-breakdown");
  });

  setTimeout(function(){populateTransactions();},1000);

});
