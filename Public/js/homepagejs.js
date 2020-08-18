


var selectedTags = {
  year: [],
  collegeYears: [],
  examType: [],
  subjects: [],
  topics: []
};

var height;
function snackbarFunction(condition) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerHTML=condition;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function scroll_to(div){
	$('html, body').animate({
		scrollTop: $("#dataBody").offset().top
	},2000);
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

function removeTag(tag, top) {
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
  else if(top) {
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


//Displaying data dynamically
let dataBody=document.getElementById('dataBody');
let display=function(result){
  console.log(result);
  if(result.length){
    dataBody.style.paddingLeft="9%";//to center the content
    for(i=0;i<result.length;i++){
      console.log(result[i]);
      //image is temporary ,later a pdf would be added
      dataBody.innerHTML+='<div class="container changeDiv" ><div class="row box" style="padding-left: 0rem; background-color: white;"><div class="col-md-5" style="margin:1rem;"><img class="img-responsive" src="./images/homepagebg.png" width="100%" style="border :2px solid blue;"></div><div class="col-md-5 boxInfo" style="margin:1rem;line-height: 135%;font-size: 100%;"><strong><span style="color:blue;">Test Subject:</span>'+ result[i].doc_subject+'<br></strong><strong><span style="color:blue">Test Exam:</span>'+result[i].doc_exam+'<br></strong><strong><span style="color:blue">Test Year:</span>'+result[i].doc_year+'-'+result[i].doc_date_asked+'<br></strong><strong><span style="color:blue">Topic: </span>'+result[i].topic+'</strong></div><div class="w-500"></div><button class="btn btn-md" id="buttonHover" type="button" name="button" style="position:relative;left:55%;top:50px;"><a href='+result[i].doc_link+' target="_blank" id="a" >Click Here</a></button></div></div>';
      
    };
    height = $(document).height();
    scroll_to();
  }
  else{
  console.log("no result");
  dataBody.style.padding="0px";//to center the content
  dataBody.innerHTML='<h2>File not found</h2>';
  }
}


//AutoComplete
$(document).ready(function(){
  $("#foo").slideDown();
  $("#searchBar").focus( () => {
    $("#foo").slideUp();
    $("#tag.tag-final").slideDown();
  });
  $("#searchBar").focusout( () => {
    $("#foo").slideDown();
    $("#tag.tag-final").slideUp();
  });
  // $("body").click(() => {
  //   $("#tag.tag-final").hide();
  // });  
  
  // Search Bar transition
  var searchbar = $(".homepagesearchbar-initial"); 
  var logo = $("#logo");
  var tagArea = $("#tag");
  $(window).scroll(function () { 
      var scroll = $(window).scrollTop(); 
      // $("#tag").slideUp();
      console.log(scroll);
      if (scroll >= 255 && height > 1100) { 
        // $("#foo").slideDown();
                  $("#tag").hide();
        searchbar.removeClass('homepagesearchbar-initial') 
                  .addClass("homepagesearchbar-final"); 
        logo.removeClass('logo-initial')
                  .addClass('logo-final');
        tagArea.removeClass('tag-initial')
                  .addClass('tag-final');
      } else { 
        searchbar.removeClass("homepagesearchbar-final") 
                  .addClass('homepagesearchbar-initial');
        logo.removeClass('logo-final')
                  .addClass('logo-initial');
        tagArea.removeClass('tag-final')
                  .addClass('tag-initial');
        $("#tag").show();
        // $("#foo").slideUp();
      } 
  }); 



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
  // -----------------------------------------------------
  $(".tagarea").on('click','.cross',function() {
     var searchtoremove=$(this).parent().text();
     searchtoremove=searchtoremove.slice(0, -1);
     $(this).parent().remove();
     // alert(searchtoremove);
     if(availableTop.indexOf(searchtoremove) >= 0)
      removeTag(searchtoremove, 1);
     else
      removeTag(searchtoremove, 0);
});
  // -----------------------------------------------------
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
          var areaa=$(".tagarea");
          areaa.append('<div class="tagmake ">'+searchresult+'<button type ="button" class="cross">x</button>'+'</div>');
          console.log(getCat(searchresult));
          console.log(selectedTags[getCat(searchresult)]);
          selectedTags[getCat(searchresult)].push(searchresult);
        }
        else
          snackbarFunction("Already Selected");
        console.log(selectedTags);
        $("#searchBar").val('');
      }
      else {

        snackbarFunction("Invalid Tag");
      }
  });

    $("#searchbutton").on("click",function(){
      var tagsjson= JSON.stringify(selectedTags);
      console.log(tagsjson);
      dataBody.innerHTML="";
      var parsed=JSON.parse(tagsjson);
      $.ajax({
        type: "POST",
        url:"/search",
        data:tagsjson,
        contentType: "application/json",
        dataType:"text",
        success: function(result){
          console.log("passed!");
          //result=JSON.stringify(result);
          result=JSON.parse(result);
          display(result);
          //console.log(result[0]["doc_exam"]);
        },
        error: function() {
          console.log("failed!");
      }
      });
    });

});
