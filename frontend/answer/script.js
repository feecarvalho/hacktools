let latitude;
let longitude;
const jwtToken = window.localStorage.getItem("HackTools:token");

window.onload = async () => {
  const id = window.localStorage.getItem("id");

  if (!jwtToken) {
    window.location.replace("../index.html");
  }

  navigator.geolocation.getCurrentPosition((e) => {
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
  });

  const response = await fetch(`http://localhost:3333/quiz/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    }
  });

  const parsedResponse = await response.json();
  const saveBtn = document.getElementById("save-btn");
  const { questions } = parsedResponse;

  if (!questions.length) {
    const answerMessage = document.getElementById("answer-message");
    answerMessage.innerHTML = "Ainda não foram cadastradas perguntas neste questionário!";
    saveBtn.style.display = "none";
  }

  questions.forEach(q => createQuestion(q));
}

const formQuiz = document.getElementById("form-quiz");

formQuiz.onsubmit = (e) => {
  e.preventDefault();
  const inputs = document.getElementsByTagName("input");
  Array.from(inputs).forEach(async (x) => {
    const response = await fetch("http://localhost:3333/answers", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        latitude,
        longitude,
        answer: x.value,
        idQuestion: x.classList[0]
      }),
    });

    if (!response.error) {
      window.location.replace("../index.html");
    }
  });
};

const createQuestion = (question) => {
  const form = document.getElementById("form-quiz");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("label");
  label.innerHTML = question.question;
  input.placeholder = "Insira sua resposta";
  input.required = true;
  div.classList.add("questions");
  input.classList.add(question.id);
  div.appendChild(label);
  div.appendChild(input);
  form.appendChild(div);
}
