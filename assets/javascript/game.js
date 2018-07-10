var config = {
  apiKey: "AIzaSyAXYbzyZY_NflSt7A1f6HV4y1-NsZ0Hr6E",
  authDomain: "rps-firebase-8a299.firebaseapp.com",
  databaseURL: "https://rps-firebase-8a299.firebaseio.com",
  projectId: "rps-firebase-8a299",
  storageBucket: "",
  messagingSenderId: "772320009966"
};
firebase.initializeApp(config);

var database = firebase.database();
var messageRef = database.ref('messages');
var playerRef = database.ref('player');
var opponentRef = database.ref('opponent');

// var $time = "";
var pChoice;
var oChoice;

var $player = {
        number: '0',
        name: '',
        wins: 0,
        losses: 0,
        turns: 0,
        choice: '',
        message: ""
    };
    var $opponent = {
        number: '0',
        name: '',
        wins: 0,
        losses: 0,
        turns: 0,
        choice: '',
        message: ""
    };


$("#player-submit-button").on("click", function(event) {
  event.preventDefault();

  $player.message = $("#player-message-field").val().trim();

    firebase.database().ref('messages').set({
      name: $player.name,
      message: $player.message,
      // time: Date.now()
    });

  $("#player-message-field").val("");
});

$("#opponent-submit-button").on("click", function(event) {
  event.preventDefault();

  $opponent.message = $("#opponent-message-field").val().trim();

    firebase.database().ref('messages').set({
      name: $opponent.name,
      message: $opponent.message,
      // time: Date.now()
    });

  $("#opponent-message-field").val("");
});

firebase.database().ref('messages').on("value", function(snapshot) {
  $(".chat-area").append(snapshot.val().name + ": " + snapshot.val().message + "<br>")
});

$("#submit-player-username").on("click", function(event) {
  event.preventDefault();
  $player.name = $("#player-username").val().trim();

    firebase.database().ref('player').set({
      name: $player.name
    });

    $(".player-panel-heading").val("");
    $(".player-user-form").hide();

    $(".player-panel-heading").text($player.name)
  $("#username").val("");
});

$("#submit-opponent-username").on("click", function(event) {
  event.preventDefault();
  $opponent.name = $("#opponent-username").val().trim();

    firebase.database().ref('opponent').set({
      name: $opponent.name
    });

    $(".opponent-panel-heading").val("");
    $(".opponent-user-form").hide();

    $(".opponent-panel-heading").text($opponent.name)
  $("#opponent-username").val("");
});

firebase.database().ref('player').on("value", function(snapshot){
  $player.choice = snapshot.val().choice;
  $(".player-panel-heading").text(snapshot.val().name);
  $(".player-win-loss").text("Wins: " + snapshot.val().wins + " | " + "Losses: " + snapshot.val().losses);

  winCheck();


});

firebase.database().ref('opponent').on("value", function(snapshot){
  $opponent.choice = snapshot.val().choice;

  $(".opponent-panel-heading").text(snapshot.val().name);
  $(".opponent-win-loss").text("Wins: " + snapshot.val().wins + " | " + "Losses: " + snapshot.val().losses);

  winCheck();


});

$(".player-rock").on("click", function(event){
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $player.choice = $(".player-rock").attr("data-text");
    // console.log($player.choice);

    firebase.database().ref('player').set({
      choice: $player.choice
    });

  }

});

$(".player-paper").on("click", function(event){
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $player.choice = $(".player-paper").attr("data-text");
    // console.log($player.choice);

    firebase.database().ref('player').set({
      choice: $player.choice
    });

  }

});

$(".player-scissors").on("click", function(event){
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $player.choice = $(".player-scissors").attr("data-text");
    // console.log($player.choice);

    firebase.database().ref('player').set({
      choice: $player.choice
    });

  }

});

$(".opponent-rock").on("click", function(event) {
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $opponent.choice = $(".opponent-rock").attr("data-text");
    // console.log($opponent.choice);

    firebase.database().ref('opponent').set({
      choice: $opponent.choice
    });

  }

});

$(".opponent-paper").on("click", function(event) {
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $opponent.choice = $(".opponent-paper").attr("data-text");
    // console.log($opponent.choice);

    firebase.database().ref('opponent').set({
      choice: $opponent.choice
    });

  }

});

$(".opponent-scissors").on("click", function(event) {
  event.preventDefault();

  if ($player.name.length > 0 && $opponent.name.length > 0) {
    $opponent.choice = $(".opponent-scissors").attr("data-text");
    // console.log($opponent.choice);

    firebase.database().ref('opponent').set({
      choice: $opponent.choice
    });

  }

});

function winCheck() {

  // console.log($player.choice + " " + $opponent.choice)

  if ($player.choice.length > 0 && $opponent.choice.length > 0) {
    if ($player.choice.length === $opponent.choice.length){
      $("#results-area").text("Tie!");
    }
    else if ($player.choice === "rock") {
      if ($opponent.choice === "scissors") {
          $("#results-area").text($player.name + " wins!");
          $player.wins++;
          $opponent.losses++;
      } else if ($opponent.choice === "paper") {
          $("#results-area").text($opponent.name + " wins!");
          $opponent.wins++;
          $player.losses++;
      }
    }

    else if ($player.choice === "paper") {
      if ($opponent.choice === "rock") {
          $("#results-area").text($player.name + " wins!");
          $player.wins++;
          $opponent.losses++;
      } else if ($opponent.choice === "scissors") {
          $("#results-area").text($opponent.name + " wins!");
          $opponent.wins++;
          $player.losses++;
      }
    }

    else if ($player.choice === "scissors") {
      if ($opponent.choice === "paper") {
          $("#results-area").text($player.name + " wins!");
          $player.wins++;
          $opponent.losses++;
      } else if ($opponent.choice === "rock") {
          $("#results-area").text($opponent.name + " wins!");
          $opponent.wins++;
          $player.losses++;
      }
    }

    $player.choice = "";
    $opponent.choice = "";
  }


}

firebase.database().ref('player').set({
  wins: $player.wins,
  losses: $player.losses
});
firebase.database().ref('opponent').set({
  wins: $opponent.wins,
  losses: $opponent.losses
});

if (($player.choice === null & $opponent.choice > 0) || (($opponent.choice === null & $player.choice > 0))) {
  $player.wins = $player.wins;
  $opponent.wins = $opponent.wins;

}
