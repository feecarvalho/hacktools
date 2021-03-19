window.onload = async () => {
  const id = window.localStorage.getItem("id");
  const jwtToken = window.localStorage.getItem("HackTools:token");
  
  if (!jwtToken) {
    window.location.replace("../index.html");
  }

  const response = await fetch(`http://localhost:3333/quiz/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    }
  });

  const parsedResponse = await response.json();
  const questions = parsedResponse.questions;
  const quizTitle = document.getElementById("quiz-title");
  quizTitle.innerHTML = parsedResponse.title;

  if (questions.length > 0) {
    questions.forEach(q => {
      const questionsList = document.getElementById("questions");
      const btn = document.createElement("button");
      btn.innerHTML = "Ver respostas";
      btn.classList.add("answer-question");
      const li = document.createElement("li");
      li.innerHTML = q.question;
      btn.addEventListener("click", () => handleAnswers(q));
      li.appendChild(btn);
      questionsList.appendChild(li);
    });
  } else {
    const questionsMessage = document.getElementById("questions-message");
    questionsMessage.innerHTML = "Ainda não há perguntas cadastradas para este questionário.";
  }
}

const handleAnswers = async (question) => {
  const answerModal = document.getElementById("modal-show-question");
  const questionTitle = document.getElementById("question-title");
  const answersList = document.getElementById("respostas");
  answersList.innerHTML = "";

  questionTitle.innerHTML = question.question;

  const { answers } = question;

  if (answers.length > 0) {
    answers.forEach(a => {
      const answerLi = document.createElement("li");
      const latSpan = document.createElement("span");
      const lonSpan = document.createElement("span");
      const answerSpan = document.createElement("span");
      latSpan.innerHTML = `Latitude: ${a.latitude}`;
      lonSpan.innerHTML = `Longitude: ${a.longitude}`;
      answerSpan.innerHTML = `Resposta: ${a.answer}`;
      answerLi.append(answerSpan, latSpan, lonSpan);
      answersList.append(answerLi);
    });
  }

  answerModal.style.display="block";
}

const btnAddQuestion = document.getElementById("add-question");
const formSubmitQuestion = document.getElementById("form-question");
btnAddQuestion.addEventListener("click", () => document.getElementById('modal-question').style.display='block')
formSubmitQuestion.onsubmit = handleQuestion;

async function handleQuestion() {
  const jwtToken = window.localStorage.getItem("HackTools:token");
  const idQuiz = window.localStorage.getItem("id");
  const question = document.getElementById("question").value;
  const response = await fetch("http://localhost:3333/questions", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      question,
      idQuiz
    }),
  });

  const parsedResponse = await response.json();
  const questionsList = document.getElementById("questions")
  const li = document.createElement("li");
  li.innerHTML = parsedResponse.question;
  li.addEventListener("click", () => handleAnswers(parsedResponse.question))
  questionsList.append(li);
  document.getElementById('modal-question').style.display='none'
  window.location.reload();
}

const btnDeleteQuiz = document.getElementById("delete-quiz");
btnDeleteQuiz.addEventListener("click", handleDelete);

async function handleDelete() {
  if (window.confirm("Você deseja deletar este questionário?")) {
    const idQuiz = window.localStorage.getItem("id");
    const jwtToken = window.localStorage.getItem("HackTools:token");
    await fetch(`http://localhost:3333/quiz/${idQuiz}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    });
    window.location.replace("../index.html");
  }
}