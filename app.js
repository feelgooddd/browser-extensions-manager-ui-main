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
    //populate the page with the cards inside the extensionsDiv
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
    //main function that handles if an extension is toggled
    //as active or inactive.
    checkStatus();
  } catch (error) {
    console.log(error.message);
  }
};
function checkStatus() {
  const cards = document.querySelectorAll(".extension");
  const removeBtn = document.querySelectorAll(".btn-remove");
  //checkedBoxes array which will be populated with extensions that
  //are active.
  const checkedBoxes = [];

  //the remove Button within each card
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", removeExtension);

    function removeExtension() {
      //parentNode.parentNode is the card itself which contains the button
      // so change its display to none when remove is clicked.
      this.parentNode.parentNode.style.display = "none";
    }
  });

  cards.forEach((card) => {
    //event listeners and functions to handle
    //the All/Active/Inactive Buttons and display
    //the cards depending if they are in the checkedBoxes Array
    //or not.
    buttonActive.addEventListener("click", showActive);
    buttonAll.addEventListener("click", showAll);
    buttonInactive.addEventListener("click", showInactive);

    function showAll() {
      card.style.display = "flex";
    }
    function showActive() {
      showAll();
      if (!checkedBoxes.includes(card)) {
        card.style.display = "none";
      }
    }
    function showInactive() {
      showAll();
      if (checkedBoxes.includes(card)) {
        card.style.display = "none";
      }
    }

    //event listener to listen to the checkbox/togglebutton
    //which listens for a change and then calls function checkIt
    card.childNodes[1].childNodes[1].childNodes[0].addEventListener(
      "change",
      checkIt
    );

    //check if the cards toggle is true or false
    //and then push it to the array of active cards
    //otherwise remove it from the aray.
    function checkIt() {
      if (card.childNodes[1].childNodes[1].childNodes[0].checked === true) {
        checkedBoxes.push(card);
      } else {
        const index = checkedBoxes.indexOf(card);
        if (index > -1) {
          // only splice array when item is found
          checkedBoxes.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      //debugging logs
      console.log("clicked");
      console.log(checkedBoxes);
    }
  });
}

//handle light and dark mode.
toggleBtnBGDiv.addEventListener("click", toggleColorScheme);

function toggleColorScheme() {
  const cards = document.querySelectorAll(".extension");
  const selectBtns = document.querySelectorAll(".btn-select");
  const removeBtns = document.querySelectorAll(".btn-remove");
  const header = document.getElementById("header");
  const headerLogo = document.querySelector(".logo-text");
  const headerImage = document.querySelector(".logo-image");
  //light mode colour scheme.
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
      //using properties instead of directly editing the styles
      //to prevent adding in-line styles to the html
      //instead change the properties within the stylesheet
      //otherwise hover and focus effects will not work
      //since they are overwritten by inline styles.
      btn.style.setProperty("--bg-color", "var(--clr-neutral-800");
      btn.style.setProperty("--border", "1px solid var(--clr-neutral-600)");
      btn.style.setProperty("--color", "var(--clr-neutral-300)");
    });
    removeBtns.forEach((btn) => {
      btn.style.backgroundColor = "transparent";
      btn.style.border = "1px solid var(--clr-neutral-600)";
    });
    //dark mode colour scheme.
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
      //using properties instead of directly editing the styles
      //to prevent adding in-line styles to the html
      //instead change the properties within the stylesheet
      //otherwise hover and focus effects will not work
      //since they are overwritten by inline styles.
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
