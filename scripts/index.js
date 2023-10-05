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
    console.log(err);
}
const categoryLables = [categoryLable1, categoryLable2, categoryLable3, categoryLable4, categoryLable5, categoryLable6];


const questions = Array.from(document.getElementsByClassName("question"));

const finalQuestion = document.getElementById("final")

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
    console.log(err);
}

// returns the question for the clicked choice
function dataSiftQuestion(question, cat) {
    let i = (Number(question) + (10 * Number(cat)))
        return(placeholderQuestions[i].question)
}
// returns the answer for the clicked choice
function dataSiftAnswer(question, cat) {
    let i = (Number(question) + (10 * Number(cat)))
        return(placeholderQuestions[i].answer)
}

// crates an array of all questions and disables their defualt
try {
    questions.forEach(question => {
        question.addEventListener("click", evt => {
            evt.preventDefault();
            console.log(question.parentElement.firstElementChild.textContent + " " + question.id)
            // ! question.parentElement.firstElementChild will give category name + question.id gives id(1,2,3,4,5) (category + id)
            console.log(dataSiftQuestion(question.id, categoryLables.indexOf(question.parentElement.firstElementChild)))
            console.log(dataSiftAnswer(question.id, categoryLables.indexOf(question.parentElement.firstElementChild)))
    });
    })
} catch(err) {
    console.log(err)
}


