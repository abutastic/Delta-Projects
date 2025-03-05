let img = document.querySelector("img");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");

let currentLink = img.src;
let previousLink = null;

let url = "https://dog.ceo/api/breeds/image/random";

async function randomDog() {
  try {
    let res = await axios.get(url);
    return res.data.message;
  } catch (error) {
    return `Error: ${error}`;
  }
}

nextBtn.addEventListener("click", async () => {
  previousLink = currentLink;
  let imgLink = await randomDog();
  currentLink = imgLink;
  img.src = imgLink;

  // Enable previous button when there is a valid previous image
  if (previousLink) {
    prevBtn.disabled = false;
  }
});

prevBtn.addEventListener("click", () => {
  if (previousLink) {
    img.src = previousLink;
    currentLink = previousLink;
    previousLink = null;
    prevBtn.disabled = true;
  }
});
