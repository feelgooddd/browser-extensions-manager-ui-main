const buttonAll = document.getElementById("btn-all");
const buttonActive = document.getElementById("btn-active");
const buttonInactive = document.getElementById("btn-inactive");
const extensionsDiv = document.querySelector(".extensions");
const words = "Hello";

window.onload = async function getData() {
  const url = "data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    data.forEach((data) => {
      extensionsDiv.innerHTML =
        extensionsDiv.innerHTML +
        '<div class="extension">' +
        '<div class="extension-info">' +
        "<img src=" +
        data.logo +
        ' alt="">' +
        '<div class="extension-info-text">' +
        "<h3>" +
        data.name +
        "</h3>" +
        "<p>" +
        data.description +
        "</p>" +
        "</div>" +
        " </div>" +
        '<div class="extension-btns">' +
        '<button class="btn-remove">Remove</button>' +
        '<label class="switch">' +
        '<input type="checkbox">' +
        '<span class="slider round"></span>' +
        "</label>" +
        "</div>" +
        "</div>" +
        "</div>";
    });
    checkStatus();
  } catch (error) {
    console.log(error.message);
  }
};
function checkStatus() {
  const cards = document.querySelectorAll(".extension");
  const checkedBoxes = [];
  console.log(cards);
  cards.forEach((card) => {
    buttonActive.addEventListener("click", showActive);
    buttonAll.addEventListener("click", showAll);
    buttonInactive.addEventListener("click", showInactive);
    console.log(card);
    function showAll() {
      card.style.display = "block";
    }
    function showActive() {
      resetCards();
      if (!checkedBoxes.includes(card)) {
        card.style.display = "none";
      }
    }
    function showInactive() {
      resetCards();
      if (checkedBoxes.includes(card)) {
        card.style.display = "none";
      }
    }
    function resetCards() {
      card.style.display = "block";
    }

    card.childNodes[1].childNodes[1].childNodes[0].addEventListener(
      "change",
      checkIt
    );
    function checkIt() {
      card.childNodes[1].childNodes[1].childNodes[0].checked =
        card.childNodes[1].childNodes[1].childNodes[0].checked;

      console.log("clicked");
      console.log(card.childNodes[1].childNodes[1].childNodes[0].checked);
      if (card.childNodes[1].childNodes[1].childNodes[0].checked === true) {
        checkedBoxes.push(card);
      } else {
        checkedBoxes.pop(card);
      }
    }
  });
}
doStuff();
