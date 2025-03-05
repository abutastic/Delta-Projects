// DOM elements
let setup = document.querySelector(".setup");
let delivery = document.querySelector(".delivery");
let button = document.querySelector("button");

// categories
let checkBoxes = document.querySelectorAll(
  ".categories input[type = 'checkbox']"
);
let random = document.querySelector("#rand");

// Building API URL based on selected checkboxes
function getSelectedCategories() {
  let selectedCategories = [];

  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked && checkBox.id !== "rand") {
      selectedCategories.push(checkBox.id);
    }
  });

  if (selectedCategories.length === 0 || random.checked) {
    return "https://v2.jokeapi.dev/joke/Any?safe-mode";
  } else {
    return `https://v2.jokeapi.dev/joke/${selectedCategories.join(
      ","
    )}?safe-mode`;
  }
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("change", () => {
    if (random.checked) {
      checkBoxes.forEach((cb) => {
        if (cb !== random) {
          cb.disabled = true;
          cb.checked = false;
        }
      });
    } else {
      checkBoxes.forEach((cb) => {
        cb.disabled = false;
        random.checked = false
      });
    }
  });
});

// fetch and display joke
button.addEventListener("click", async () => {
  let url = getSelectedCategories();
  let jokeObj = await getJoke(url);

  setup.innerHTML = jokeObj.setup || jokeObj.joke;
  delivery.innerHTML = "";

  if (jokeObj.delivery) {
    setTimeout(() => {
      delivery.innerHTML = jokeObj.delivery + " 😂";
    }, 3000);
  }
});

async function getJoke(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (e) {
    console.log(`Error occured: ${e}`);
    return { setup: "Failed to Generate Joke", deliver: "Error occured" };
  }
}
