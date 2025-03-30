const buttonAll = document.getElementById("btn-all");
const buttonActive = document.getElementById("btn-active");
const buttonInactive = document.getElementById("btn-inactive");
const extensionsDiv = document.querySelector(".extensions");
const toggleColorSchemeButton = document.getElementById(
  "btn-toggle-color-scheme"
);
const toggleBtnBGDiv = document.querySelector(".toggle-btn-bgdiv");

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
        "</div>";
    });
    checkStatus();
  } catch (error) {
    console.log(error.message);
  }
};
function checkStatus() {
  const cards = document.querySelectorAll(".extension");
  const removeBtn = document.querySelectorAll(".btn-remove");
  const checkedBoxes = [];

  removeBtn.forEach((btn) => {
    btn.addEventListener("click", removeExtension);

    function removeExtension() {
      this.parentNode.parentNode.style.display = "none";
    }
  });
  cards.forEach((card) => {
    buttonActive.addEventListener("click", showActive);
    buttonAll.addEventListener("click", showAll);
    buttonInactive.addEventListener("click", showInactive);

    function showAll() {
      card.style.display = "flex";
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
      card.style.display = "flex";
    }

    card.childNodes[1].childNodes[1].childNodes[0].addEventListener(
      "change",
      checkIt
    );
    function checkIt() {
      card.childNodes[1].childNodes[1].childNodes[0].checked =
        card.childNodes[1].childNodes[1].childNodes[0].checked;

      if (card.childNodes[1].childNodes[1].childNodes[0].checked === true) {
        checkedBoxes.push(card);
      } else {
        const index = checkedBoxes.indexOf(card);
        if (index > -1) {
          // only splice array when item is found
          checkedBoxes.splice(index, 1); // 2nd parameter means remove one item only
        }
      }

      console.log("clicked");
      console.log(checkedBoxes);
    }
  });
}
toggleBtnBGDiv.addEventListener("click", toggleColorScheme);

function toggleColorScheme() {
  const cards = document.querySelectorAll(".extension");
  const selectBtns = document.querySelectorAll(".btn-select");
  const removeBtns = document.querySelectorAll(".btn-remove");
  const header = document.getElementById("header");
  const headerLogo = document.querySelector(".logo-text");
  const headerImage = document.querySelector(".logo-image");

  if (toggleColorSchemeButton.classList.contains("light")) {
    toggleColorSchemeButton.classList.remove("light");
    document.body.style.backgroundColor = "var(--clr-neutral-900)";
    document.body.style.color = "white";
    header.style.backgroundColor = "var(--clr-neutral-700)";
    headerLogo.style.fill = "#FFF";
    headerImage.style.fill = "var(--clr-red-400)";
    toggleColorSchemeButton.src = "assets/images/icon-sun.svg";
    toggleBtnBGDiv.style.backgroundColor = "var(--clr-neutral-600)";
    cards.forEach((card) => {
      card.style.backgroundColor = "var(--clr-neutral-800)";
      card.style.border = "1px solid var(--clr-neutral-600)";
      card.style.color = "var(--clr-neutral-300)";
    });
    selectBtns.forEach((btn) => {
      btn.style.setProperty("--bg-color", "var(--clr-neutral-800");
      btn.style.setProperty("--border", "1px solid var(--clr-neutral-600)");
      btn.style.setProperty("--color", "var(--clr-neutral-300)");
    });
    removeBtns.forEach((btn) => {
      btn.style.backgroundColor = "transparent";
      btn.style.border = "1px solid var(--clr-neutral-600)";
    });
  } else {
    toggleColorSchemeButton.classList.add("light");
    document.body.style.backgroundColor = "var(--clr-neutral-300)";
    document.body.style.color = "black";
    header.style.backgroundColor = "var(--clr-neutral-100)";
    headerLogo.style.fill = "var(--clr-neutral-900)";
    headerImage.style.fill = "var(--clr-red-700)";
    toggleColorSchemeButton.src = "assets/images/icon-moon.svg";
    toggleBtnBGDiv.style.backgroundColor = "var(--clr-neutral-200)";
    cards.forEach((card) => {
      card.style.backgroundColor = "var(--clr-neutral-100)";
      card.style.border = "none";
      card.style.color = "black";
    });
    selectBtns.forEach((btn) => {
      btn.style.setProperty("--bg-color", "var(--clr-neutral-100");
      btn.style.setProperty("--border", "1px solid var(--clr-neutral-400)");
      btn.style.setProperty("--color", "black");
    });
    removeBtns.forEach((btn) => {
      btn.style.backgroundColor = "var(--clr-red-700)";
      btn.style.border = "none";
    });
  }
}
