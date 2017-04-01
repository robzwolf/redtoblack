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
        color: '#82CCA9',
        duration: 800,
        easing: 'easeInOut'
  });
  leisurebar.animate(value);
}



/* Draw the food progress bar with a value on a scale from 0 to 1 */
var drawFoodBar = function(value)
{
  var foodbar = new ProgressBar.Line('#progress-food', {
        color: '#82CCA9',
        duration: 800,
        easing: 'easeInOut'
  });
  foodbar.animate(value);
}


$(document).ready(function(){

  // var leisurebar = new ProgressBar.Line('#progress-leisure', {
  //       color: '#82CCA9',
  //       duration: 800,
  //       easing: 'easeInOut'
  // });
  //
  // var foodbar = new ProgressBar.Line('#progress-food', {
  //       color: '#82CCA9',
  //       duration: 800,
  //       easing: 'easeInOut'
  // });
  //
  // leisurebar.animate(1);
  // setTimeout(function(){
  //   foodbar.animate(0.5);
  // },400);

  drawLeisureBar(1);
  drawFoodBar(0.5);

});
