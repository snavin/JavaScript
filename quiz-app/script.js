const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { options: "Shark", correct: false },
            { options: "Blue Whale", correct: true },
            { options: "Elephant", correct: false },
            { options: "Giraffe", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { options: "Vatican City", correct: true },
            { options: "Bhutan", correct: false },
            { options: "Nepal", correct: false },
            { options: "Sri Lanka", correct: false }
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            { options: "Kalahari", correct: false },
            { options: "Gobi", correct: false },
            { options: "Sahara", correct: false },
            { options: "Antartica", correct: true }
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            { options: "Asia", correct: false },
            { options: "Australia", correct: true },
            { options: "Artic", correct: false },
            { options: "Africa", correct: false }
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.options;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore()
{
    resetState();
    questionElement.innerHTML= `You have scored ${score} out of ${questions.length}!`
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display="block";
}


startQuiz();