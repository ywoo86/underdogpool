$().ready(function(){

  $('select').material_select();

  // reset all values
  var resetAll = function(){
    var $selectGameOptions = $('.select-game-options');
    var $images = $('div.team-images');
    var $weeklySelections = $('#weekly-selections');
    var $tempStore = $('div.temp-store');

    $images.remove();
    $selectGameOptions.remove();
    $weeklySelections.hide();
    $tempStore.attr('data-num', "");
  };

  // get/return the value of the selected week
  var getValue = function(elStr){
    var $tempVal = $(elStr).val();
    return $tempVal;
  };


  // multi ajax call and processing
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
    var $selection = $("<select class='select-game'>");
    var $noOption = $("<option value='' disabled selected>-- Select Visiting Underdogs --</option>");
    $selection.append($noOption);
    $weeklySelections.show();
    // var $tempStore = $('.temp-store');

    do {
      // create div.team-images element with 'away' image at 'home' image
      var $div = $("<div class='team-images card-panel col s4 center-align'>");
      var tempHTML = "<img src='/images/" + data.away[count].palette
        + "'> at <img src='/images/"
        + data.home[count].palette + "'>";
      $div.html(tempHTML);

      // append div.team-images element to the div.weekly-listing
      $listing.append($div);

      // create option.weekly-option element with value of matchups_id
      var $option = $("<option class='select-game-options' name='" + data.away[count].away_id + "'value='"+ data.away[count].matchups_id  +"'>");
      $option.text(data.away[count].teams_name);
      $selection.append($option);

      // so i dont continue to bang my head against the wall and hide data instead

      count++;
    } while (count < data.away.length)

    // $tempStore.attr('data-num', data.away[count].away_id);

    $weeklySelections.append($selection);

    $('select').material_select();
  }; // finally the end of this function!


  // Listening for change in week dropdown value
  $('#select-week').change(function(event){
    resetAll();
    var urlStr = 'matchups/' + getValue('#select-week');
    ajaxMethod(urlStr, 'get', changeWeek, null);
  });


  // Listening for click action on submit to send picks to db
  $('button.submit-picks').on('click', function(event){
    var urlStr = 'matchups/';
    var tempValue = getValue('select.select-game');
    var $option = $("option.select-game-options[value="+tempValue+"]").attr('name');

    var data = {
      game_picked: tempValue,
      team_picked: $option
    };

    ajaxMethod(urlStr, 'post', confirmFxn, data);
    resetAll();
  });

  // Random function just to confirm successful action
  var confirmFxn = function(){
    console.log('Success!');
    // confirmation animation
  };

  // Reset any values on the screen
  resetAll();

});
