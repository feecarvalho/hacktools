window.onload = async () => {
  
  const jwtToken = window.localStorage.getItem("HackTools:token");
  
  if (!jwtToken) {
    window.location.replace("../index.html");
  }
  const response = await fetch("http://localhost:3333/quiz", {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    }
  });

  if (response.status === 404) {
    const quizMesssage = document.getElementById("quiz-list-message");
    quizMesssage.innerHTML = "Nenhum questionário cadastrado.";
  }

  const parsedResponse = await response.json();
  const quizList = document.getElementById("quiz-list");

  if (!parsedResponse.error) {
    parsedResponse.forEach(q => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const btnVisualizar = document.createElement("button");
      const btnAnswer = document.createElement("button");
      btnAnswer.innerHTML = "Responder";
      btnAnswer.classList.add("answer-quiz");
      btnAnswer.addEventListener("click", () => answerQuiz(q.id));
      btnVisualizar.innerHTML = "Configurar";
      btnVisualizar.classList.add("answer-quiz");
      li.classList.add("quiz-item");
      li.innerHTML = q.title;
      btnVisualizar.addEventListener("click", () => selectQuiz(q.id));
      span.innerHTML = `Data: ${q.createdAt.split("T")[0].split("-").reverse().join("/")}`;
      span.style.marginLeft = "auto";
      span.style.marginRight = "10px";
      li.appendChild(span);
      li.appendChild(btnAnswer);
      li.appendChild(btnVisualizar);
      quizList.appendChild(li);
    });
  }
}

const answerQuiz = (idQuiz) => {
  window.localStorage.setItem("id", idQuiz);
  window.location.replace("../answer/index.html");
}

const selectQuiz = (idQuiz) => {
  window.localStorage.setItem("id", idQuiz);
  window.location.replace("../quiz/index.html");
}

const btnNewQuiz = document.getElementById("btn-new-quiz");
const formCreateQuiz = document.getElementById("form-create-quiz")

btnNewQuiz.addEventListener("click", () => document.getElementById('modal-create-quiz').style.display = "block");
formCreateQuiz.onsubmit = submitQuiz;

async function submitQuiz(e) {
  e.preventDefault();
  const jwtToken = window.localStorage.getItem("HackTools:token");
  const title = document.getElementById("title").value;

  const response = await fetch("http://localhost:3333/quiz", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({title}),
  });
  
  const parsedResponse = await response.json();

  const quizList = document.getElementById("quiz-list");
  const li = document.createElement("li");
  li.innerHTML = parsedResponse.title;
  quizList.appendChild(li);
  document.getElementById('modal-create-quiz').style.display='none';
  window.location.reload();
}

const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", handleLogout)

function handleLogout() {
  window.localStorage.clear();
}