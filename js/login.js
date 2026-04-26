// elements
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// switch tabs
loginTab.onclick = () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
};

signupTab.onclick = () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
};

// signup
document.getElementById("signupBtn").onclick = () => {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPw").value;

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created! Now login.");
  loginTab.click();
};

// login
document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPw").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
};

// password strength
const signupPw = document.getElementById("signupPw");

signupPw.addEventListener("input", () => {
  const val = signupPw.value;
  const bars = [
    document.getElementById("bar1"),
    document.getElementById("bar2"),
    document.getElementById("bar3"),
    document.getElementById("bar4")
  ];

  bars.forEach(b => b.className = "");

  let score = 0;
  if (val.length > 6) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  let level = score <= 1 ? "weak" : score <= 2 ? "medium" : "strong";

  for (let i = 0; i < score; i++) {
    bars[i].classList.add(level);
  }
});