const numberOfQuestions = 3;
var questionTrack = 1;

var nextButton = document.getElementById('next');
var previousButton = document.getElementById('previous');
var finishButton = document.getElementById('finish');

function updateQuestionNumber() {
  document.querySelector('#question-number').textContent = `Question ${questionTrack} out of ${numberOfQuestions}`
}

function displayError() {
  document.querySelector('.error').classList.add('error-active');
}

function hideError() {
  document.querySelector('.error').classList.remove('error-active');
}

function answerSelected(questionId) {
  var radios = document.getElementsByName(questionId);
  for (radio of radios) {
    if (radio.checked) {
      return true;
    }
  }
  return false;
}

function setActive(track) {
  document.querySelector('.active-question').classList.remove('active-question');
  var questionId = 'question' + track;
  document.getElementById(questionId).classList.add('active-question');
  if (track === 1) {
    document.getElementById('previous').classList.remove('active-button');
  }
  else if (track === numberOfQuestions) {
    document.getElementById('next').classList.remove('active-button')
    document.getElementById('finish').classList.add('active-button');
  }
  else {
    document.getElementById('next').classList.add('active-button')
    document.getElementById('previous').classList.add('active-button')
    document.getElementById('finish').classList.remove('active-button');
  }
}

updateQuestionNumber();

nextButton.addEventListener('click', function() {
  hideError();
  if (answerSelected('question' + questionTrack)) {
    questionTrack ++;
    setActive(questionTrack);
    updateQuestionNumber();
  }
  else {
    displayError();
  }
})
previousButton.addEventListener('click', function() {
  hideError();
  questionTrack --;
  setActive(questionTrack);
  updateQuestionNumber();
})
finishButton.addEventListener('click', function() {
  hideError();
  if(answerSelected('question' + questionTrack)) {
    document.getElementById('question-number').classList.add('hide-question-number');
    document.querySelector('.active-question').classList.remove('active-question');
    document.getElementById('previous').classList.remove('active-button')
    document.getElementById('finish').classList.remove('active-button');
    document.querySelector('.score').classList.add('score-active');
    var quizScore = 0;
    var correctAnswers = document.getElementsByClassName('correct');
    for (ans of correctAnswers) {
      if (ans.checked) {
        quizScore++;
      }
    }
    document.getElementById('score-number').textContent = `${String(quizScore)}/${String(numberOfQuestions)}`;
  }
  else {
    displayError();
  }
})