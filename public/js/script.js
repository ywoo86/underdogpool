$().ready(function(){

  // $('select').material_select();

  // reset all values
  var resetAll = function(){
    var $selectGameOptions = $('.select-game-options');
    var $images = $('div.team-images');
    var $weeklySelections = $('#weekly-selections');

    $images.remove();
    $selectGameOptions.remove();
    $weeklySelections.hide();
  };

  // get/return the value of the selected week
  var getValue = function(elStr){
    var $tempVal = $('#select-week').val();
    return $tempVal;
  };

  // getJSON call
  // var getData = function(url, fxName){
  //   $.getJSON(url)
  //   .done(function(data){
  //     fxName(data);
  //   })
  //   .fail(function(data){
  //     console.log('Error: GET Failed')
  //   })
  // };

  //
  var ajaxMethod = function(urlStr, meth, fxName, data){
    $.ajax({
      url: urlStr,
      method: meth,
      data: data,
      success: function(data){
        fxName(data);
      },
      error: function(data){
        console.log("Error: "+ meth +" Failed");
      }
    })
  };


  var changeWeek = function(data){
    var $listing = $('.weekly-listing');
    var count = 0;


    var $weeklySelections = $('div#weekly-selections');
    $weeklySelections.show();

    var $selection1 = $('.select-game-1');
    var $selection2 = $('.select-game-2');
    var $selection3 = $('.select-game-3');

    do {
      // create div.team-images element with 'away' image at 'home' image
      var $div = $("<div class='team-images'>");
      var tempHTML = "<img src='/images/" + data.away[count].palette
        + "'> at <img src='/images/"
        + data.home[count].palette + "'>";
      $div.html(tempHTML);

      // append div.team-images element to the div.weekly-listing
      $listing.append($div);


      // create option.weekly-option element with value of matchups_id and game name
      var $option1 = $("<option class='select-game-options' value='"+  data.away[count].matchups_id  +"'>");
      $option1.text(data.away[count].teams_name + ' at ' + data.home[count].teams_name);

      var $option2 = $("<option class='select-game-options' value='"+  data.away[count].matchups_id  +"'>");
      $option2.text(data.away[count].teams_name + ' at ' + data.home[count].teams_name);

      var $option3 = $("<option class='select-game-options' value='"+  data.away[count].matchups_id  +"'>");
      $option3.text(data.away[count].teams_name + ' at ' + data.home[count].teams_name);

      // append option.weekly-option element to select.select-game
      $selection1.append($option1);
      $selection2.append($option2);
      $selection3.append($option3);

      // increment count
      count++;
    } while (count < data.away.length)
  };

  // Listening for change in week dropdown value
  $('#select-week').change(function(event){
    resetAll();
    var urlStr = 'matchups/' + getValue('#select-week');
    // getData(urlStr, changeWeek);
    ajaxMethod(urlStr, 'get', changeWeek, null);
  });

  $('.submit-picks').on('click', function(event){
    var urlStr = 'matchups/';
    var data = {};
  });




  // Reset any values on the screen
  resetAll();

});
