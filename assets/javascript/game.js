$(document).ready(function () {


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXYbzyZY_NflSt7A1f6HV4y1-NsZ0Hr6E",
    authDomain: "rps-firebase-8a299.firebaseapp.com",
    databaseURL: "https://rps-firebase-8a299.firebaseio.com",
    projectId: "rps-firebase-8a299",
    storageBucket: "",
    messagingSenderId: "772320009966"
  };
  var app = firebase.initializeApp(config);
  var database = firebase.database();
  var chatRef = database.ref("chat");
  var connectRef = database.ref("connections");



  var gameOn;
  var flag = false;
  var player = {
    wins: 0,
    losses: 0,
    move: '',
    bool: '0',
    turns: 0,
    username: ''
  }

  var opponent = {
    wins: 0,
    losses: 0,
    move: '',
    bool: '0',
    turns: 0,
    username: ''
  }

  var $messages = $(".chat-messages");
  var $username = $("#username").val();

    // function setup() {

      connectRef.once("value", function(snapshot) {

        if (Object.keys(snapshot.val()).indexOf('1') === -1) {
          player.bool = '1';
          opponent.bool = '2';
        } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
          opponent.bool = '1';
          player.bool = '2';
        }

        if (player.bool === '0') {
          // $("section").remove();
          app.delete();

        } else  {
          gameOn = connectRef.child(player.bool);
          gameOn.set(player);
          gameOn.onDisconnect().remove();
        }

      });
    // }

    // function playerInit() {

      connectRef.on("value", function (snapshot) {
        if (gameOn) {
          if (Object.keys(snapshot.val()).indexOf(opponent.bool) !== -1) {
            opponent = snapshot.val()[opponent.bool];
            player = snapshot.val()[player.bool];

            if (opponent.username.length > 0) {
              DOM.displayOpponent();

              if (player.username.length > 0) {
                var choice1 = snapshot.val()['1'].move;
                var choice2 = snapshot.val()['2'].move;
                var turns1 = snapshot.val()['1'].turns;

                if (choice1.length > 0 && choice2.length > 0) {
                  getWinner(choice1, choice2);
                } else if (choice1.length === 0 && turns1 === 0) {
                  DOMFunctions.showMoveOptions('1');
                } else if (choice1.length > 0 && choice2.length === 0) {
                  DOMFunctions.showMoveOptions('2');
                }
              }

            }

          } else if (opponent.username.length > 0 && Object.keys(snapshot.val()).indexOf(opponent.bool) === -1) {
                $('.turn').text('Waiting for new opponent.');
                $('.waiting-' + opponent.bool).show();
                $('.name-' + opponent.bool).empty();
                $('.win-loss-' + opponent.bool).empty();
            }
        }
      });
    // }

    // function chooseName() {

      $('#submit-username').on('click', function () {
        player.username = $username;
        if (player.username.length > 0) {
            gameOn.update({
                name: player.username
            });
            DOM.showSelfJoin();
        }

        return false;
    });

    // }


    var DOM = {
        showSelfJoin: function () {
            username.val('');
            $('.user-form').hide();
            $('.waiting-' + player.bool).hide();
            $('.name-' + player.bool).text(player.username);
            $('.win-loss-' + player.bool).text('Wins: ' + player.wins + ' | Losses: ' + player.losses);
            // $('.hello').text('Hello ' + player.username + '! You are player ' + player.bool + '.').show();
            $('.turn').show();
            $('.chat-row').show();
            $('.moves-' + opponent.bool).remove();
            this.updateScroll();
        },
        displayOpponent: function () {
            $('.waiting-' + opponent.bool).hide();
            $('.name-' + opponent.bool).text(opponent.username);
            $('.win-loss-' + opponent.bool).text('Wins: ' + opponent.wins + ' | Losses: ' + opponent.losses);
        },
        updatePlayerStats: function () {
            $('.win-loss-' + player.bool).text('Wins: ' + player.wins + ' | Losses: ' + player.losses);
        },
        updateScroll: function () {
            $messages[0].scrollTop = $messages[0].scrollHeight;
        },
        showMoveOptions: function (currentPlayer) {
            if (currentPlayer === player.bool) {
                $('.moves-' + currentPlayer).css('display', 'flex');
            }
            $('.turn').text('Player ' + currentPlayer + '\'s turn.');
        },
        showChats: function (snap) {
            var chatMessage = snap.val();
            // Only show messages sent in the last half hour. A simple workaround for not having a ton of chat history.
            if (Date.now() - chatMessage.timestamp < 900,000) {
                var $messageDiv = $('<div class="message">');
                $messageDiv.html('<span class="sender">' + chatMessage.sender + '</span>: ' + chatMessage.message);
                $messages.append(messageDiv);
            }
            DOM.updateScroll();
        },
        showGameResult: function (message) {
            this.updatePlayerStats();
            $('.choice-' + opponent.bool).text(opponent.choiceText).show();
            $('.turn').hide();
            $('.winner').text(message);
            $('.moves').hide();
            setTimeout(function () {
                $('.winner').empty();
                $('.turn').show();
                $('.choice').empty().hide();
                DOM.showMoveOptions('1');
            }, 3000)
        }
    };


  });
