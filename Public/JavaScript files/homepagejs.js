var selectedTags = {
  year: [],
  collegeYears: [],
  examType: [],
  subjects: [],
  topics: []
};

function snackbarFunction() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function getCat(tag) {
  if(/^\d+$/.test(tag)) {
    return "year";
  }
  else if(tag.toLowerCase() == "fe" || tag.toLowerCase() == "se" || tag.toLowerCase() == "te" || tag.toLowerCase() == "be") {
    return "collegeYears";
  }
  else if(tag.toLowerCase() == "ise" || tag.toLowerCase() == "ese" || tag.toLowerCase() == "mse") {
    return "examType";
  }
  else if(document.getElementById("Topic").checked) {
    return "topics";
  }
  else {
    return "subjects";
  }
}

function removeTag(tag) {
  var index;
  if(/^\d+$/.test(tag)) {
    index = selectedTags.year.indexOf(tag);
    selectedTags.year.splice(index, 1);
  }
  else if(tag.toLowerCase() == "fe" || tag.toLowerCase() == "se" || tag.toLowerCase() == "te" || tag.toLowerCase() == "be") {
    index = selectedTags.collegeYears.indexOf(tag);
    selectedTags.collegeYears.splice(index, 1);
  }
  else if(tag.toLowerCase() == "ise" || tag.toLowerCase() == "ese" || tag.toLowerCase() == "mse") {
    index = selectedTags.examType.indexOf(tag);
    selectedTags.examType.splice(index, 1);
  }
  else if(document.getElementById("Topic").checked) {
    index = selectedTags.topics.indexOf(tag);
    selectedTags.topics.splice(index, 1);
  }
  else {
    index = selectedTags.subjects.indexOf(tag);
    selectedTags.subjects.splice(index, 1);
  }
}

function isTagPresent(tag) {
  if(/^\d+$/.test(tag)) {
    return selectedTags.year.includes(tag);
  }
  else if(tag.toLowerCase() == "fe" || tag.toLowerCase() == "se" || tag.toLowerCase() == "te" || tag.toLowerCase() == "be") {
    return selectedTags.collegeYears.includes(tag);
  }
  else if(tag.toLowerCase() == "ise" || tag.toLowerCase() == "ese" || tag.toLowerCase() == "mse") {
    return selectedTags.examType.includes(tag);
  }
  else if(document.getElementById("Topic").checked) {
    return selectedTags.topics.includes(tag);
  }
  else {
    return selectedTags.subjects.includes(tag);
  }
}

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
  var common = ["2020", "2019", "2018", "2017", "2016", "2015", "fe", "se", "te", "be", "ise", "ese", "mse"];
  var availableTop = ["Quantum Mechanics", "Solid State", "Green Chemistry", "C-Language", "Differential Calculus", "Fusion", "Integral Calculus", "Taylor Series"];
  var availableSub = ["Maths", "Communication Skills", "DataBase Management Systems", "Computer Architecture and Organization", "Abstract Data Structures", "Physics", "Chemistry", "EVS"];
  // Constructing the suggestion engine
  var commonTagHelper = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: common
  });
  var tagHelper = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: availableTop
  });

  // Initializing the typeahead
  $('#searchBar').typeahead({
    hint: true,
    highlight: true, /* Enable substring highlighting */
    minLength: 1 /* Specify minimum characters required for showing suggestions */
  },
  {
      name: 'common',
      source: commonTagHelper
  },
  {
      name: 'topicsOrSubjects',
      source: tagHelper
  });

  //show usergenerated array

  $("#Topic").on("click", () => {
    tagHelper.clear();
    tagHelper.local = availableTop;
    tagHelper.initialize(true);
  });

  $("#Subject").on("click", () => {
    tagHelper.clear();
    tagHelper.local = availableSub;
    tagHelper.initialize(true);
  });

  $("#addtag").on("click",function(){
    // alert(typeof(tagHelper));
      var searchresult=$("#searchBar").val();
      var resultCat = getCat(searchresult);
      var resultvalid = 0;
      if(resultCat == "year" || resultCat == "collegeYears" || resultCat == "examType") {
        if(common.indexOf(searchresult) >= 0)
          resultvalid = 1;
      }
      else if(resultCat == "subjects") {
        if(availableSub.indexOf(searchresult) >= 0)
          resultvalid = 1;
      }
      else {
        if(availableTop.indexOf(searchresult) >= 0)
          resultvalid = 1;
      }

      if(resultvalid) {
        console.log(isTagPresent(searchresult));
        if(!isTagPresent(searchresult)) {
          console.log(getCat(searchresult));
          console.log(selectedTags[getCat(searchresult)]);
          selectedTags[getCat(searchresult)].push(searchresult);
        }
        else 
          snackbarFunction();
        console.log(selectedTags);
        $("#searchBar").val('');
      }
      else {
        snackbarFunction();
      }      
  });

});
