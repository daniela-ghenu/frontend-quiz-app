import "./main.css";
import data from "./data/data.json";
import Handlebars from "handlebars";

// Import templates and partials
import question from "./templates/partials/question.hbs?raw";

// Register partials
Handlebars.registerPartial("question", question);

// Compile templates
const questionTemplate = Handlebars.compile(question);

let score = 0;
const mainContainer = document.querySelector(".js-main-content");

document.querySelectorAll(".js-quiz-button")?.forEach(button => {
  button.addEventListener("click", () => handleQuizSelection(button));
});

function handleQuizSelection(button) {
  // Initialization
  const quizSubject = data.quizzes?.find((subject) => subject.title === button.id);
  let questionNumber = 0;
  let currentQuestion = quizSubject.questions[questionNumber];
  let maxQuestions = quizSubject.questions.length;
  
  insertQuizLabel(quizSubject);
  
  // Display the first question
  displayQuestion(maxQuestions, questionNumber + 1, currentQuestion);
  displayProgress(questionNumber);  

  // Delegate "submit" to main container to retain the listener when questions change
  mainContainer?.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = mainContainer.querySelector('input[type="submit"]');
    const selectedOption = mainContainer.querySelector('input[name="options"]:checked');
    const errorMessage = document.querySelector(".js-error-container");

    errorMessage.style.display = "none";

    if(!selectedOption) {
      errorMessage.style.display = "flex";
      return;
    }

    if(!submitBtn.classList.contains("js-next-question")) {
      validateOption(selectedOption, currentQuestion.answer);
      submitBtn.classList.add("js-next-question");
      submitBtn.value = "Next Question";
      
    } else if(questionNumber < (maxQuestions - 1)) {
        questionNumber ++;
        currentQuestion = quizSubject.questions[questionNumber];
        
        displayQuestion(maxQuestions, questionNumber + 1, currentQuestion);
        displayProgress(questionNumber);

      } else {
        console.log("Display the score", score);
      }
  });
}

function insertQuizLabel(quiz) {
  // Select header label to display the quiz information
  const quizLabel = document.querySelector(".js-quiz-label");
  const quizIcon = quizLabel.querySelector(".js-quiz-icon");
  const quizText = quizLabel.querySelector(".js-quiz-text");

  // Select quiz data to display in the header
  quizLabel.style.visibility = "visible";
  quizIcon.src = quiz.icon;
  quizIcon.parentElement.style.backgroundColor = quiz.iconBgColor;
  quizText.textContent = quiz.title;
}

function displayQuestion(maxQuestions, questionNumber, currentQuestion) {
  mainContainer.innerHTML = questionTemplate({
    maxQuestions,
    questionNumber,
    currentQuestion
  });
}

function displayProgress(questionNumber) {
  document.querySelector(".js-progress").style.width = `${(questionNumber + 1)*10}%`;
}

function validateOption(option, answer) {
  const optionsList = option.closest(".js-options");
  optionsList?.classList.add("disable-selection");

  if(option.value === answer) {
    option.parentElement.classList.add("correct");
    score ++;
    
  } else {
    option.parentElement.classList.add("incorrect");

    // If the selected option is incorrect, show the correct option
    optionsList.querySelectorAll('input[name="options"]')?.forEach(inputOption => {
      if(inputOption.value === answer) {
        inputOption.parentElement.querySelector(".checkmark").style.display = "block";
      }
    });
  }
}
