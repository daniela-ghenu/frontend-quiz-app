import data from "./data/data.json";
import Handlebars from "handlebars";

// Import templates and partials
import question from "./templates/partials/question.hbs?raw";
import result from "./templates/partials/result.hbs?raw";
import quizLabel from "./templates/partials/quiz-label.hbs?raw";

// Register partials
Handlebars.registerPartial("question", question);
Handlebars.registerPartial("result", result);
Handlebars.registerPartial("quizLabel", quizLabel);

// Compile partials
const questionPartial = Handlebars.compile(question);
const resultPartial = Handlebars.compile(result);
const quizLabelPartial = Handlebars.compile(quizLabel);

let score = 0;
const mainContainer = document.querySelector(".js-main-content");

// Handle quiz subject selection
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

    errorMessage.style.opacity = "0";
    errorMessage.setAttribute("aria-hidden", "true");

    if(!selectedOption) {
      errorMessage.style.opacity = "1";
      errorMessage.setAttribute("aria-hidden", "false");
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
        displayResult(maxQuestions, score);
        insertQuizLabel(quizSubject);
        
        document.querySelector(".js-play-again")?.addEventListener("click", () => {
          window.location.reload();
        });
      }
  });
}

function insertQuizLabel(quiz) {
  const {title, icon, iconBgColor} = quiz;

  // Select all labels to display the quiz information
  document.querySelectorAll(".js-quiz-subject").forEach(quizLabel => {
    quizLabel.innerHTML = quizLabelPartial({
      title,
      icon,
      iconBgColor
    });

    quizLabel.style.visibility = "visible";
  });
}

function displayQuestion(maxQuestions, questionNumber, currentQuestion) {
  mainContainer.innerHTML = questionPartial({
    maxQuestions,
    questionNumber,
    currentQuestion
  });
}

function displayProgress(questionNumber) {
  document.querySelector(".js-progress").style.width = `${(questionNumber + 1)*10}%`;
}

function displayResult(maxQuestions, score) {
  mainContainer.innerHTML = resultPartial({
    maxQuestions,
    score
  });
}

function validateOption(option, answer) {
  const optionsList = option.closest(".js-options");
  
  if(option.value === answer) {
    option.parentElement.classList.add("correct");
    score ++;
    
  } else {
    option.parentElement.classList.add("incorrect");

    // If the selected option is incorrect, show the correct option
    optionsList.querySelectorAll('input[name="options"]').forEach(inputOption => {
      if(inputOption.value === answer) {
        inputOption.parentElement.querySelector(".checkmark").style.display = "block";
      }
    });
  }

  // Disable options after validation
  optionsList?.classList.add("disable-selection");
  optionsList?.querySelectorAll('input[name="options"]').forEach(inputOption => {
    const optionLabel = inputOption.parentElement;

    if(!(optionLabel.classList.contains("correct") || optionLabel.classList.contains("incorrect"))) {
      inputOption.disabled = "true";
    }
  });
}