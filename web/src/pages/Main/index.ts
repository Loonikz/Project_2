import "./styles.scss"

const toggle = document.getElementById("toggle");
const theme = window.localStorage.getItem("theme");

if (theme === "dark") document.body.classList.add("dark");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (theme === "dark") {
    window.localStorage.setItem("theme", "light");
  } else window.localStorage.setItem("theme", "dark");
});

console.log('main')

const profile = document.getElementById('profile');
const modalSecurity = document.getElementById('modal-security');
const closedModal = document.getElementById('closed-modal');

profile.addEventListener('click', ()=> {
  modalSecurity.style.display = "block";
});

closedModal.addEventListener('click', () => {
  modalSecurity.style.display = "none";
});
