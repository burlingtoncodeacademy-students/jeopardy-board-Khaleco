// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });
const category1 = document.getElementById("category1");
const category2 = document.getElementById("category2");
const category3 = document.getElementById("category3");
const category4 = document.getElementById("category4");
const category5 = document.getElementById("category5");
const category6 = document.getElementById("category6");
// set <p> for category and adds them to an array
var categoryLable1 = undefined;
var categoryLable2 = undefined;
var categoryLable3 = undefined;
var categoryLable4 = undefined;
var categoryLable5 = undefined;
var categoryLable6 = undefined;
try{
    categoryLable1 = category1.firstElementChild;
    categoryLable2 = category2.firstElementChild;
    categoryLable3 = category3.firstElementChild;
    categoryLable4 = category4.firstElementChild;
    categoryLable5 = category5.firstElementChild;
    categoryLable6 = category6.firstElementChild;
} catch(err) {
    console.log("No categorys" + err);
}
const categoryLables = [categoryLable1, categoryLable2, categoryLable3, categoryLable4, categoryLable5, categoryLable6];

const questions = Array.from(document.getElementsByClassName("question"));

const finalQuestion = document.getElementById("final-q")

const modalBack = document.getElementById("modalBack");
const modalQuestion = document.getElementById("modalQuestion");

const userInput = document.getElementById("guessInput");
const guess = document.getElementById("guess");
const pass = document.getElementById("pass");

const playerTurn = Array.from(document.getElementsByTagName("h2"));

var currentQuestionIndex;
var currentQuestion;
var guessPass;

const player1Score = document.getElementById("player1score");
const player2Score = document.getElementById("player2score");
const player1Name = document.querySelector("#player1");
const player2Name = document.querySelector("#player2");
var urlParams = new URLSearchParams(window.location.search);

var turnSwitch = 0;
if (urlParams.get("player1")){
    player1Score.textContent = urlParams.get("player1");
    player2Score.textContent = urlParams.get("player2");
    turnSwitch = urlParams.get("turn");
    player1Name.textContent = urlParams.get("player1Name");
    player2Name.textContent = urlParams.get("player2Name");
}
const betInput = document.getElementById("bet-input");
const finalAnswer = document.getElementById("fin-answer");
const bet = document.getElementById("bet");

const message = document.getElementById("message");

var player1final = true;
var player2final = true;

const nextRound = document.getElementById("next-round");
const round = document.getElementsByClassName("round");
var questionsClicked = 0;

// gets info from URLparams and sets the appropriate value

// creates category variable and grabs each cotegory at a step of 10 (10 questions per category)
const categorys = [];
for (let i = 0; i < 60; i += 10) {
    categorys.push(placeholderQuestions[i].category);
}

// assaigns the textContent for all category <p> to be the name of the corresponding category
// try catch for title ond final jeopary as they have no categorys and will throw TypeErrors
try {
    for (let i = 0; i < 6; i++) {
        categoryLables[i].textContent = categorys[i];
    }
} catch(err) {
    console.log("No categorys" + err);
}


// returns the question for the clicked choice
function dataSiftQuestion(index) {
        return(placeholderQuestions[index].question)
}
// returns the answer for the clicked choice
function dataSiftAnswer(index) {

        return(placeholderQuestions[index].answer)
}

// crates an array of all questions, disables their defualt, displays a modal with the question and form.
try {
    questions.forEach(question => {
        question.addEventListener("click", evt => {
            evt.preventDefault();
            guessPass = 0;
            currentQuestionIndex = (Number(question.id) + (10 * Number(categoryLables.indexOf(question.parentElement.firstElementChild))));
            currentQuestion = question;
            modalBack.style.display = "flex";
            modalQuestion.textContent = dataSiftQuestion(currentQuestionIndex);
            question.disabled = true;
            question.style.backgroundColor = "#303030";
            question.style.color = "#303030"
            guess.style.display = "flex";
            pass.style.display = "flex";
            userInput.style.display = "flex";
            questionsClicked++;
        });
    })
} catch(err) {
    console.log("No questions" + err)
}

try {
    playerTurn.forEach(turn => {
        if(turnSwitch) {
            turn.textContent = `${player2Name.textContent.split(" ")[0]}'s Turn`;
        } else {
            turn.textContent = `${player1Name.textContent.split(" ")[0]}'s Turn`;
        }
    })
} catch (error) {
    console.log(error);
}

function changeTurn() {
    playerTurn.forEach(turn => {
        if(!turnSwitch) {
            turn.textContent = `${player2Name.textContent.split(" ")[0]}'s Turn`;
        } else {
            turn.textContent = `${player1Name.textContent.split(" ")[0]}'s Turn`;
        }
    })
    if (turnSwitch) {
        turnSwitch = 0;
    } else {
        turnSwitch = 1;
    }
}

function modalNone () {
    modalBack.style.display = "none";
}

function nextTrue(){
    if (round[0].textContent == "Round One") {
        if (Number(player1Score.textContent) >= 15000 || Number(player2Score.textContent) >= 15000 || questionsClicked == 30) {
            nextRound.style.display = "flex";
        }    
    } else if (round[0].textContent == "Second Round") {
        if (Number(player1Score.textContent) >= 30000 || Number(player2Score.textContent) >= 30000 || questionsClicked == 30) {
            nextRound.style.display = "flex";
        }    
    }
}

try {
    // read userInput and compare aganst answer if true award current player points if false revome points and pass turn.
    guess.addEventListener("click", evt => {
        evt.preventDefault();
        if (userInput.value.toLowerCase() == dataSiftAnswer(currentQuestionIndex).toLowerCase()) {
            if (!turnSwitch){
                player1Score.textContent = Number(player1Score.textContent) + Number(currentQuestion.textContent);
            } else {
                player2Score.textContent = Number(player2Score.textContent) + Number(currentQuestion.textContent);
            }
            userInput.value = "";
            modalBack.style.display = "none"
            nextTrue();
        } else {
            if (!turnSwitch){
                player1Score.textContent = Number(player1Score.textContent) - Number(currentQuestion.textContent);
            } else {
                player2Score.textContent = Number(player2Score.textContent) - Number(currentQuestion.textContent);
            }
            changeTurn();
            guessPass += 1;
        }
        if (guessPass == 2) {
            modalQuestion.textContent = dataSiftAnswer(currentQuestionIndex);
            guess.style.display = "none";
            pass.style.display = "none";
            userInput.style.display = "none";
            setTimeout(modalNone, 5000);
            nextTrue();
        } 
        userInput.value = "";
    })

    // pass player turn if both pass give answer and skip question
    pass.addEventListener("click", evt => {
        evt.preventDefault();
        if (guessPass < 1) {
            changeTurn();
            guessPass += 1;
        } else {
            modalQuestion.textContent = dataSiftAnswer(currentQuestionIndex);
            guess.style.display = "none";
            pass.style.display = "none";
            userInput.style.display = "none";
            nextTrue();
            changeTurn();
            setTimeout(modalNone, 5000)
        }
    })
} catch(err) {
    console.log("No form " + err)
}

// ! question.parentElement.firstElementChild will give category name + question.id gives id(1,2,3,4,5) (category + id)

function gameOver() {
    modalBack.style.display = "flex";
    modal.style.width = "50%";
    message.textContent = `The Answer was: ${placeholderQuestions[60].answer}, Final Scores: Player 1: ${player1Score.textContent} Player 2: ${player2Score.textContent}`;
}

try{
    bet.textContent = "Bet";
    guessPass = 0;
    if (Number(player1Score.textContent) <=0 && Number(player2Score.textContent) <= 0) {
        player1final = false;
        player2final = false;
        modalBack.style.display = "flex";
        message.textContent = "Both players can't compete in the final round.";
        setTimeout(modalNone, 5000);
        setTimeout(gameOver, 5001);
    } else if (Number(player1Score.textContent) <= 0) {
        player1final = false;
        modalBack.style.display = "flex";
        message.textContent = "Player 1 can't compete this round";
        setTimeout(modalNone, 5000);
        if (!turnSwitch) {
            changeTurn();
        }
    } else if (Number(player2Score.textContent) <= 0) {
        player2final = false;
        modalBack.style.display = "flex";
        message.textContent = "Player 2 can't compete this round";
        setTimeout(modalNone, 5000);
        if (turnSwitch) {
            changeTurn();
        }
    }
    finalQuestion.textContent = placeholderQuestions[60].question;
    finalAnswer.addEventListener("keyup", evt => {
        if(betInput.value && finalAnswer.value) {
            bet.disabled = false;
        }
    })
    betInput.addEventListener("keyup", evt => {
        if(betInput.value && finalAnswer.value) {
            bet.disabled = false;
        }
    })
    bet.addEventListener("click", evt => {
        evt.preventDefault();
        
        if (!turnSwitch && player1final == true) {
            if (Number(betInput.value) > Number(player1Score.textContent) || Number(betInput.value) <= 0) {
                // invalid bet amount
                modalBack.style.display = "flex";
                message.textContent = "Invalid bet amount";
                setTimeout(modalNone, 2000);
            } else if (finalAnswer.value.toLowerCase() == dataSiftAnswer(60).toLowerCase()) {
                player1Score.textContent += Number(betInput.value);
            } else {
                player1Score.textContent -= Number(betInput.value);
            }
            if (player2final == true && guessPass < 1){
                changeTurn();
                guessPass++;
            } else {
                gameOver();
            }
        } else if (turnSwitch && player2final == true) {
            if (Number(betInput.value) > Number(player2Score.textContent) || Number(betInput.value) <= 0) {
                // invalid bet amount
                modalBack.style.display = "flex";
                message.textContent = "Invalid bet amount";
                setTimeout(modalNone, 2000);
            } else if (finalAnswer.value.toLowerCase() == dataSiftAnswer(60).toLowerCase()) {
                player2Score.textContent += Number(betInput.value);
            } else {
                player2Score.textContent -= Number(betInput.value);
            }
            if (player1final == true && guessPass < 1) {
                changeTurn();
                guessPass++;
            } else {
                gameOver();
            }
        }
    })
} catch(err) {
    console.log("Not the final jeopardy " + err);
}
// TODO FinalJeopardy constenstants with less than $1 can't participate

try {
    const start = document.getElementById("start");
    start.addEventListener("click", (evt) => {
        evt.preventDefault();
        modalBack.style.display = "flex";
    })
} catch (error) {
    console.log(error);
}

try {
    const begin = document.getElementById("begin");
    begin.addEventListener("click", evt => {
        const names = {
            player1: "0",
            player1Name: player1Name.value + " 's Score:",
            player2: "0",
            player2Name: player2Name.value + " 's Score:",
            turn: turnSwitch
        }
        begin.href += ("?" + new URLSearchParams(names))
    })
} catch (error) {
    console.log(error);
}

try {
    nextRound.addEventListener("click", evt => {
        const scores = {
            player1: player1Score.textContent,
            player1Name: player1Name.textContent,
            player2: player2Score.textContent,
            player2Name: player2Name.textContent,
            turn: turnSwitch
        }
        nextRound.href += ("?" + new URLSearchParams(scores));
        console.log(nextRound)
    })
} catch(err) {
    console.log("no next round button " + err)
}