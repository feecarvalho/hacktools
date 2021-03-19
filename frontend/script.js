window.onload = () => {
  const jwtToken = window.localStorage.getItem("HackTools:token");

  if (jwtToken) {
    window.location.replace("./Home/index.html");
  }
}

const ulSquares = document.querySelector("ul.animated-squares");

const btnLogin = document.querySelector("button.btn-login");
const btnRegister = document.querySelector("button.btn-register");

const btnSubmitLogin = document.getElementById("submit-login");
const registerForm = document.getElementById("register-form");

const statusMessage = document.getElementById("status-message");

const closeLogin = document.getElementById("close-login");
const closeRegister = document.getElementById("close-register");
closeLogin.addEventListener("click", () => document.getElementById('modal-login').style.display='none');
closeRegister.addEventListener("click", () => document.getElementById('modal-register').style.display='none');

const generateSquares = () => {
  const li = document.createElement("li");

  const random = (min, max) => Math.random() * (max - min) + min;

  const colors = [
    "98, 0, 118, 0.80",
    "142, 0, 115, 0.80",
    "141, 48, 230, 0.80",
    "184, 25, 255, 0.80",
    "166, 138, 255, 0.80"
  ];

  const size = Math.floor(random(10, 190));
  const position = random(1, 99);
  const delay = random(10, 0.1);
  const duration = random(30, 15);
  
  li.style.left = `${position}%`;
  li.style.width = `${size}px`;
  li.style.height = `${size}px`;
  li.style.bottom = `-${size}px`;
  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
  li.style.backgroundColor = `rgba(${colors[Math.floor(Math.random() * colors.length)]})`;
  return li;
}

for (let i = 0; i < 26; i++) {
  ulSquares.appendChild(generateSquares());
}

btnLogin.addEventListener("click", () => document.getElementById('modal-login').style.display = "block");
btnRegister.addEventListener("click", () => document.getElementById('modal-register').style.display = "block");

btnSubmitLogin.addEventListener("click", login);

registerForm.onsubmit = async (e) => {
  e.preventDefault();

  const password = document.getElementById("register-password");
  const confirmPassword = document.getElementById("confirm-password");
  const registerMessage = document.getElementById("register-message");

  if (password.value === confirmPassword.value) {
    submit(password.value);
  } else {
    registerMessage.innerHTML = "As senhas não correspondem.";
    return;
  }
};

async function submit(password) {
  const email = document.getElementById("register-email").value;
  const registerMessage = document.getElementById("register-message");

  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
  const parsedResponse = await response.json();

  if (parsedResponse.error) {
    registerMessage.innerHTML = parsedResponse.message;
  } else {
    document.getElementById('modal-register').style.display = "none";
    statusMessage.innerHTML = "Conta criada com sucesso";
  }
}

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginMessage = document.getElementById("login-message");

  const response = await fetch("http://localhost:3333/sessions", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  });

  const parsedResponse = await response.json();

  if (!parsedResponse.error) {
    const { token, user } = parsedResponse;
    window.localStorage.setItem("HackTools:token", token);
    window.localStorage.setItem("HackTools:user", JSON.stringify(user));
    window.location.replace("./home/index.html");
  } else {
    loginMessage.innerHTML = parsedResponse.message;
  }  
}
