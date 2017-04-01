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


$(document).ready(function(){
  var leisurebar = new ProgressBar.Line('#progress-leisure', {
        color: '#4dd',
        duration: 800,
        easing: 'easeInOut'
  });
  var foodbar = new ProgressBar.Line('#progress-food', {
        color: '#4dd',
        duration: 800,
        easing: 'easeInOut'
  });
  leisurebar.animate(1);
  setTimeout(function(){
    foodbar.animate(0.5);
  },400);
});
