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

var $name = "";
var $message = "";
var $time = Date.now();

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
      time: $time
    });

  $("#player-message-field").val("");
});

$("#opponent-submit-button").on("click", function(event) {
  event.preventDefault();

  $opponent.message = $("#opponent-message-field").val().trim();

    firebase.database().ref('messages').set({
      name: $opponent.name,
      message: $opponent.message,
      time: $time
    });

  $("#opponent-message-field").val("");
});

firebase.database().ref('messages').on("value", function(snapshot) {
  $(".chat-area").append(snapshot.val().name + ": " + snapshot.val().message + snapshot.val().time + "<br>")
})

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
})

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
})
