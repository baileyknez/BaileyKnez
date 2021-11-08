var startIndex=0;
var startIndex1=0;
var searchButton=1;
var baileyNavButton=1;
var bool=0;
var totalResults=0;
var searchtext;  
var toggle =0;

$(document).ready(function(){
  $baileyShelf();
  $searchButtonColor();
  $baileyNavButtonColor();

$("#bookshelfsoptions").click(function(){
  $toggleOptions();
});
$('#homepage').click(function(){
    $clearpage();
    $('#welcome').show();
   
});
$("#searchpage").click(function(){
    $clearpage();
    $('#search').show();
});

$("#baileyShelf").click(function(){
    $clearpage();
    $('#myShelf').show();
});

$("#SearchButton").click(function(){
      console.log("search submitted");
      searchtext = $('#textbox').val();
    
      if(searchtext == ''){
        alert("Please enter something to search");
    }
    else{
      if(bool > 0){
    console.log("clear");
    $clearbooksearch();
      }
    startIndex=0;
    searchButton=1;
    $searchbook();
    $searchButtonColor();
    }
});
$('#searchNavButton1', ).click(function(){
  $clearbooksearch();
  startIndex=0; 
  searchButton=1;
  $searchbook();
  $searchButtonColor();
});
$('#searchNavButton2', ).click(function(){
  $clearbooksearch();
  startIndex=10; 
  searchButton=2;
  $searchbook();
  $searchButtonColor();
});
$('#searchNavButton3', ).click(function(){
  $clearbooksearch();
  startIndex=20; 
  searchButton=3;
  $searchbook();
  $searchButtonColor();
});
$('#searchNavButton4', ).click(function(){
  $clearbooksearch();
  startIndex=30; 
  searchButton=4;
  $searchbook();
  $searchButtonColor();
});
$('#searchNavButton5', ).click(function(){
  $clearbooksearch();
  startIndex=40; 
  searchButton=5;
  $searchbook();
  $searchButtonColor();
});
$('#baileyNavButton1', ).click(function(){
  $clearBaileySearch();
  startIndex1=0; 
  baileyNavButton=1;
  $baileyShelf();
  $baileyNavButtonColor();
});
$('#baileyNavButton2', ).click(function(){
  $clearBaileySearch();
  startIndex1=10; 
  baileyNavButton=2;
  $baileyShelf();
  $baileyNavButtonColor();
});

});

$clearpage = function(){
    $('#welcome').hide();
    $('#myShelf').hide();
    $('#search').hide();
    $('#BookShelf').hide();
};

$clearbooksearch = function(){
    $("div[id*='book']").each(function (x, pj) {
    $(pj).remove();
    console.log("book removed");
 });
};
$clearBaileySearch = function(){
    $("div[id*='bailey_bk']").each(function (x, pj) {
    $(pj).remove();
    console.log("Bailey's book removed");
 });
};
$searchbook = function(){
  $.get("https://www.googleapis.com/books/v1/volumes?q="+searchtext+"&startIndex="+startIndex, function(searchResponse){
    console.log(searchResponse);
    console.log("search from:" + startIndex);
    var searchdata, cover;
    
    
    bool++; 
    for (i=0;i<searchResponse.items.length; i++){
    cover = searchResponse.items[i].volumeInfo.imageLinks.thumbnail;
    searchdata = "<div id='book' tabindex='0' >";
    searchdata += "<div id='bookcover'>"; 
    searchdata +=  "<h2 id='title'>"+searchResponse.items[i].volumeInfo.title +"</h2>";
    searchdata += "</a>";      
    searchdata += "<br>";
	  searchdata += "<p><img id='img' src='" + cover + "'></p>";
    searchdata += "</div>";
    searchdata += "<h2>Auther:</h2>";
    searchdata +="<p>"+searchResponse.items[i].volumeInfo.authors+"</p>";
    searchdata += "<h2>Catagories</h2>";
    searchdata +="<p>"+searchResponse.items[i].volumeInfo.categories+"</p>";   
    searchdata += "<h2>Description</h2>";
    searchdata +="<p>"+searchResponse.items[i].volumeInfo.description+"</p>"; 
    searchdata += "<h2>Publisher</h2>";
    searchdata +="<p>"+searchResponse.items[i].volumeInfo.publisher+"</p>"; 
    searchdata += "<br>";
   
    searchdata += "</div>";
    $("#searchResults").append(searchdata);
    }
    $("#searchNav").show();
  });
}


$baileyShelf=function(){
    $.get("https://www.googleapis.com/books/v1/users/100449795462524380304/bookshelves/1001/volumes?startIndex="+startIndex1, function(searchResponse){
   console.log(searchResponse);
   console.log("search from:" + startIndex1);
   totalResults=searchResponse.totalItems;
   console.log("total results:"+totalResults)
   var baileysdata, cover, id;
   var p=1;
   var tab=0;
   
   
   
   for (i=0;i<searchResponse.items.length; i++){
   id= searchResponse.items[i].id;
   cover = searchResponse.items[i].volumeInfo.imageLinks.thumbnail;
   baileysdata = "<div id='bailey_bk' tabindex='0'>";
   baileysdata += "<div id='bkcover'>";
   baileysdata += "<h2 id='title'>"+searchResponse.items[i].volumeInfo.title +"</h2>";     
   baileysdata += "<br>";
   baileysdata += "<p><img id='img' src='" + cover + "'></p>";
   baileysdata += "</div>";
   baileysdata += "<div id='moreInfo'>";
   baileysdata += "<h2>Auther:</h2>";
   baileysdata +="<p>"+searchResponse.items[i].volumeInfo.authors+"</p>";
   baileysdata += "<h2>Catagories</h2>";
   baileysdata +="<p>"+searchResponse.items[i].volumeInfo.categories+"</p>";   
   baileysdata += "<h2>Description</h2>";
   baileysdata +="<p>"+searchResponse.items[i].volumeInfo.description+"</p>"; 
   baileysdata += "<h2>Publisher</h2>";
   baileysdata +="<p>"+searchResponse.items[i].volumeInfo.publisher+"</p>"; 
   baileysdata += "<br>";
   baileysdata += "</div>";
   baileysdata += "</div>";
   $("#baileyResults").append(baileysdata);
   }
  });
};
$toggleOptions=function(){
  console.log("bookshelf options");
if(toggle == 0){
    $("#shelfOptions").show(); 
    toggle++;
    console.log("item shown and count:" +toggle);
}
else{
    $("#shelfOptions").hide();
    toggle--;
    console.log("item hidden and count:"+toggle);
}
};
$searchButtonColor = function(){
  $searchButtonWhite();
  switch(searchButton){
    case 1:
      $("#searchNavButton1").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 2:      
      $("#searchNavButton2").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 3:     
      $("#searchNavButton3").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 4:    
      $("#searchNavButton4").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 5:
      $("#searchNavButton5").css("background-color","rgba(211, 206, 206, 0.582)");
    break;

  }
};
$searchButtonWhite = function(){
  $("#searchNavButton1").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton2").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton3").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton4").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton5").css("background-color","rgba(255, 255, 255, .7)");
};
$baileyNavButtonColor = function(){
  switch(baileyNavButton){
    case 1:
      $("#baileyNavButton2").css("background-color","rgba(255, 255, 255, .7)");
      $("#baileyNavButton1").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 2:
      $("#baileyNavButton1").css("background-color","rgba(255, 255, 255, .7)");
      $("#baileyNavButton2").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
  }
}
$googleShelf=function(){};
$google_signin = function(){}; 


