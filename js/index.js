var players = [
  ['Chris', 0, 'E96680'],
  ['Rebecca', 0, '9B5F89'],
  ['John', 0, '625A8E'],
  ['Sarah', 0, '0C5197']
];

var questions = [
  ['How many years did the Hundred Years War last?', '116'],
  ['How many feet are there in a fathom?', 'Six'],
  ['What type of creature is a dugite?', 'Snake'],
  ['Who painted The Water Lily Pool?', 'Claude Monet'],
  ['In the human body what is the hallux?', 'Big toe'],
  ['In which year did Henry VIII become King of England?', '1509'],
  ['Madame de Pompadour was the mistress of which French King?', 'Louis XV'],
];

startQuiz();

function startQuiz() {
  var i = questions.length;
  for (i; i > 0; i--) {
    $('.questions').prepend('<div class="question gallery-cell" id="question' + i + '"><div class="question-text">' + questions[i - 1][0] + '</div><div class="answer-text">' + questions[i - 1][1] + '<form class="players"></form></div></div>');

    for (var p = players.length; p > 0; p--) {
      $('#question' + i + ' form.players').prepend('<input id="question' + i + 'player' + p + '" value="player' + p + '" name="question' + i + '" type="radio" style="background:#' + players[p - 1][2] + '"><label style="background:#' + players[p - 1][2] + '" for="question' + i + 'player' + p + '">' + players[p - 1][0] + '</label><br/>');
    }

  }
}

$('.players input').on("click", function() {
  var currentQuestion = $('.dot.is-selected').index();
  var correctPlayer;
  
  if ($(this).index() == 0) {
    correctPlayer = $(this).index();
  } else {
    correctPlayer = $(this).index() / 3;
  }

  questions[currentQuestion][2] = correctPlayer;
  
  calculateScores();

  var playerColor = $(this).css('background-color');
  $('li.dot.is-selected').css('background-color', playerColor)
  setTimeout(function() {
    $('.gallery').flickity('next')
  }, 500);
})

$('.question').on('click', function() {
  $(this).addClass('show-answer');
})

function calculateScores() {
  for (var p = 0; p < players.length; p++) {
    players[p][1] = 0;
  }

  for (var q = 0; q < questions.length; q++) {
    if (questions[q][2]) {
      var correctPlayer = questions[q][2];
      var score = parseInt(players[correctPlayer][1])
      players[correctPlayer][1] = score+1;
      
      if (q = questions.length) {
        console.log(players);
      }
    }
  }
}

function restart() {
  $('.question.show-answer').removeClass('show-answer');
  $('input:checked').removeAttr('checked');
  $('.gallery').flickity('select', 0);
  $('.dot:not(:last-child)').css("background-color", '#ddd')
}

$('.restart').click(function(){
  restart();
})