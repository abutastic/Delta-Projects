//  fetch dom elements

let genBtn = document.querySelector("button");
let passContainer = document.querySelector(".passContainer");
let passLen = document.querySelector("input");

let passChars = "$%123^&4567890!@#*()";

genBtn.addEventListener("click", () => {
  let length = Number(passLen.value);

  if (length >= 5 && length <= 20) {
    generatePass();
  } else {
    alert("Enter a number between 5 - 20.");
  }
});

function generatePass() {
  let password = "";
  for (let i = 0; i < passLen.value; i++) {
    let randNum = Math.floor(Math.random() * passChars.length);
    password += passChars[randNum];
  }

  console.log(password);
  displayPass(password);
}

function displayPass(pass) {
  passContainer.innerHTML = pass;
}
