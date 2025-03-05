let inputs = document.querySelectorAll("input");
let passArea = document.querySelector("#display");
let genBtn = document.querySelector("button");
let copyBtn = document.querySelector("#copy");

let capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let small = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let chars = "!@#$%^&*()-_=+[]{}|";

function getSelectedChars() {
  let selectedChars = "";

  if (inputs[0].checked) {
    selectedChars += capital;
  }
  if (inputs[1].checked) {
    selectedChars += small;
  }
  if (inputs[2].checked) {
    selectedChars += numbers;
  }
  if (inputs[3].checked) {
    selectedChars += chars;
  }
  if (selectedChars === "") {
    selectedChars = capital + small + numbers + chars;
  }

  return selectedChars;
}

function genPassword() {
  let password = "";
  let chars = getSelectedChars();
  for (let i = 0; i < 8; i++) {
    let num = Math.floor(Math.random() * chars.length);
    password += chars[num];
  }

  console.log(password);
  displayPass(password);
}

function displayPass(pass) {
  passArea.innerText = pass;
  console.log(`Password: ${pass}`);
}

genBtn.addEventListener("click", genPassword);

copyBtn.addEventListener("click", () => {
  const passwordText = document.querySelector("#display").innerText;

  if (passArea.innerText == '') {
    alert("Generate a passowrd first!");
    return;
  }
  navigator.clipboard
    .writeText(passwordText)
    .then((res) => {
      alert(`${passwordText} Copied to clipboard!`);
    })
    .catch((er) => {
      alert("Failed to copy: ", er);
    });

    setTimeout(() => {
      document.querySelector("#display").innerText = '';
    }, 5000);
});
