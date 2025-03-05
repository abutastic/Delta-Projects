let userInput = document.querySelector("input");
let getButton = document.querySelector("button");
let colList = document.querySelector(".list");
let url = "http://universities.hipolabs.com/search?name=";

getButton.addEventListener("click", async () => {
  let colleges = await getColleges(userInput.value);
  showColleges(colleges);
});

function showColleges(colArr) {
  colList.innerText = "";
  for (const col of colArr) {
    let li = document.createElement("li");
    li.innerText = col.name;
    colList.appendChild(li);
  }
}

async function getColleges(state) {
  try {
    let res = await axios.get(url + state);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
    return [];
  }
}
