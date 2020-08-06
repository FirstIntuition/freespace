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
//AutoComplete
$(document).ready(function(){
  // Defining the local dataset
  var tagHelper = ['2020', '2019', '2018', '2017', '2016', '2015', 'Maths', 'Communication Skills', 'DataBase Management Systems', 'Computer Architecture and Organization', 'Abstract Data Structures', 'Physics', 'Chemistry', 'EVS'];
  
  // Constructing the suggestion engine
  var tagHelper = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: tagHelper
  });
  
  // Initializing the typeahead
  $('#searchBar').typeahead({
      hint: true,
      highlight: true, /* Enable substring highlighting */
      minLength: 1 /* Specify minimum characters required for showing suggestions */
  },
  {
      name: 'tagHelper',
      source: tagHelper
  });
});
