const questionArea = document.getElementById('question');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('choiceArea'); 
const answerFeedback = document.getElementById('answerFeedback');

let shuffledQuestions = 0; 
let currentQuestion = 0;
let pointsScored = 0;

window.addEventListener('load', gameLoop);
answerButtons.addEventListener('click', () => { 
    currentQuestion++
    nextQuestion()
})
//
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};
//
function gameLoop(){

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    nextQuestion();

}

function nextQuestion(){

    resetGameField();
    showQuestion(shuffledQuestions[currentQuestion]);
    // console.log(pointsScored);

}

function showQuestion(question){

    questionElement.innerText = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('button')

        if(answer.correct){

            button.dataset.correct =  answer.correct;

        }

        button.addEventListener('click', selectedAnswer);
        answerButtons.appendChild(button);

    });

}

function resetGameField(){

    while(answerButtons.firstChild){

        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectedAnswer(e){

    const chosenButton = e.target;
    const correct = chosenButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestion + 1){
        nextQuestion();
    }



}

function setStatusClass(element, correct){
    clearStatus(element);

    //this always says incorrect don't know why

    if(correct) {

        element.classList.add('correct')
        answerFeedback.innerText = "Correct";
        answerFeedback.classList.remove('hide');
        pointsScored = pointsScored + 5;

         


    } else {
        element.classList.add('wrong')
        answerFeedback.innerText = "Incorrect";
        answerFeedback.classList.remove('hide');
         pointsScored = pointsScored - 3;

        
    }

}

function clearStatus(element){

    element.classList.remove('correct');
    element.classList.remove('wrong');
    //answerFeedback.classList.add('hide');
}

const questions = [
    {
        question: "What does the const tag do?",
        answer: [ 
            { text: "Creates a variable that can't be changed", correct: true },
            { text: "Creates a variable that can be changed freely", correct: false},
            { text: "Makes a frog ribbit somewhere in the universe" , correct: false},
            { text: "Initalizes an array of size 0", correct: false}
        ]
    },

    {
        question: "What does the let tag do?",
        answer: [ 
            { text: "Creates a variable that can't be changed", correct: false },
            { text: "Creates a variable that can be changed freely", correct: true},
            { text: "Makes a frog emerge from it's hollow somewhere in Montana" , correct: false},
            { text: "Creates a function", correct: false}
        ]
    },

    {
        question: "How many variables can you pass into a function declaration?",
        answer: [ 
            { text: "Javascript is limited to 10 at any given time.", correct: false },
            { text: "It's limited to the memory present on the computer running the program.", correct: false},
            { text: "As many as the programmer wishes." , correct: true},
            { text: "40000", correct: false}
        ]
    }
]