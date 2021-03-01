const questionArea = document.getElementById('question');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('choiceArea'); //

let shuffledQuestions, currentQuestion;

window.addEventListener('load', gameLoop);


function gameLoop(){

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    nextQuestion();

}

function nextQuestion(){

    resetGameField();
    showQuestion(shuffledQuestions[currentQuestion]);

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
    
    
}

function setStatusClass(element, correct){
    clearStatus(element);

    if(correct) {

        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

function clearStatus(element){

    element.classList.remove('correct');
    element.classList.remove('wrong');
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
    }
]