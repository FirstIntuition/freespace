// Lines 1-13 toggle the year buttons if selected
$("#FEbtn").on("click",function(){
  $("#FEbtn").toggleClass("yearbtnpressed");
});
$("#SEbtn").on("click",function(){
  $("#SEbtn").toggleClass("yearbtnpressed");
});
$("#TEbtn").on("click",function(){
  $("#TEbtn").toggleClass("yearbtnpressed");
});
$("#BEbtn").on("click",function(){
  $("#BEbtn").toggleClass("yearbtnpressed");
});
$("#searchbutton").on("click",function(){
  $("#searchbutton").addClass("yearbtnpressed");
  setTimeout(function(){$("#searchbutton").removeClass("yearbtnpressed");},400);
});
