$("document").ready(function(){
  var started = false;
  var playable = false;
  var strict = false;
  var count = 1;
  var playIndex = 0;
  var sequence = [];
  var time = 640;
  var audios = [];
  audios.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"));
  audios.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"));
  audios.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"));
  audios.push(new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"));

  $("#start").on('click', function(){
    if ($("#start-text").html() == "Start") {
      $("#start-text").html("Reset");
      start();
    } else {
      $("#start-text").html("Start");
      playable = false;
      count = 0;
      showCount();
    }
  });

  $(".game-button").on('click', function() {
    if (playable) {
      var id = $(this).attr('id');
      if (id == sequence[playIndex]) {
        show(id);
        if (playIndex == 19) {
          $("#message").html("Win!").css('color', 'green');
          setTimeout(function(){
            $("#message").html("");
            start();
          }, 2000)
          playable = false;
        } else if (playIndex == sequence.length - 1) {
          playable = false;
          addStep();
          setTimeout(function() {
            showCount();
            showSequence();
          }, time);
        } else {
          playIndex++;
        }
      } else if (strict) {
        $("#message").html("Wrong!").css('color', 'red');
        setTimeout(function() {
            $("#message").html("");
            start();
          }, 2000);
      } else {
        $("#message").html("Wrong!");
        setTimeout(function() {
            $("#message").html("");
            showSequence();
          }, 1000);
      }
    }
  });

  $('#strict').on('click', function() {
    strict = (strict) ? false : true;
  });

  function start() {
    playable = false;
    count = 1;
    showCount()
    newSequence();
    showSequence();
  }

  function newSequence() {
    sequence = [Math.floor(Math.random() * 4).toString()]
  }

  function addStep() {
    sequence.push(Math.floor(Math.random() * 4).toString());
    count++;
  }

  function showSequence(){
    var index = 0;
    playable = false;
    for (var i = 0; i < sequence.length; i++) {
      setTimeout(function() {
        show(sequence[index]);
        index++;
      }, time*(i+1));
    }
    playable = true;
    playIndex = 0;
  }

  function show(id) {
    switch(id) {
      case '0':
        $("#0").css('background-color', '#0F0');
        setTimeout(function() {
          $("#0").css('background-color', "#0A0");
        }, 300);
        break;
      case '1':
        $("#1").css('background-color', '#F00');
        setTimeout(function() {
          $("#1").css('background-color', "#A00");
        }, 300);
        break;
      case '2':
        $("#2").css('background-color', '#FF0');
        setTimeout(function() {
          $("#2").css('background-color', "#AA0");
        }, 300);
        break;
      case '3':
        $("#3").css('background-color', '#00F');
        setTimeout(function() {
          $("#3").css('background-color', "#00A");
        }, 300);
    }

    audios[id].play()
  }

  function showCount() {
    if (count < 10) {
      $("#count").html('0'+count);
    } else {
      $("#count").html(count.toString());
    }
  }
});
