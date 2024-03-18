document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const check = document.getElementById("check");

  let inputValue = "";
  let reversedValue = "";

  check.addEventListener("click", function (event) {
    let pal = true;
    reversedValue = "";
    event.preventDefault();
    inputValue = input.value.trim();
    for (let i = inputValue.length - 1; i >= 0; i--) {
      reversedValue += inputValue[i];
    }

    if (inputValue % 2) {
      let halfMark = inputValue.length / 2;
      for (let i = 0; i < halfMark; i++) {
        if (inputValue[i] !== reversedValue[i]) {
          pal = false;
        }
      }
    } else {
      let halfMark = Math.floor(inputValue.length / 2);
      for (let i = 0; i < halfMark; i++) {
        if (inputValue[i] !== reversedValue[i]) {
          pal = false;
        }
      }
    }

    if (pal) {
      document.querySelector(".result").style.display = "block";
      document.getElementById("word").textContent = `${inputValue}`;
      document.getElementById("isornot").textContent = " is ";
    } else {
      document.querySelector(".result").style.display = "block";
      document.getElementById("word").textContent = `${inputValue}`;
      document.getElementById("isornot").textContent = " is not ";
    }
  });

  //SELECT LEVEL

  const main = document.getElementById("main");

  document.getElementById("enterGame").addEventListener("click", function () {
    document.getElementById("flexContainer").style.transform =
      "translateX(-510px)";
    main.style.height = "18rem";
    main.style.marginTop = "10rem";

    function noDisplay() {
      document.querySelector(".contentOne").style.display = "none";
      document.getElementById("userName").focus();
    }
    setTimeout(noDisplay, 550);
    main.style.border = "4px solid white";
  });
  document.getElementById("backToStart").addEventListener("click", function () {
    document.getElementById("flexContainer").style.transform = "translateX(0)";
    document.querySelector(".contentOne").style.display = "block";
    main.style.height = "27.5rem";
    main.style.border = "0px solid white";
    main.style.marginTop = "4rem";
  });

  //GAME

  let userNameValue = "";
  const selectLevelDiv = document.getElementById("selectLevelDiv");
  const easyLevel = document.getElementById("easyLevel");
  const hardLevel = document.getElementById("hardLevel");
  const backEasy = document.getElementById("backEasy");
  const userText = document.querySelector(".userText");
  const timer = document.getElementById("timer");
  let round = 0;
  const easyAnswerOne = document.getElementById("easyAnswerOne");
  const easyAnswerTwo = document.getElementById("easyAnswerTwo");
  const hardAnswerOne = document.getElementById("hardAnswerOne");
  const hardAnswerTwo = document.getElementById("hardAnswerTwo");
  const points = document.getElementById("points");
  let userPoints = 0;
  let timeLimit = 0;

  // Easy Level

  let choices = [
    {
      correct: "radar",
      wrong: "dadar",
    },
    {
      correct: "level",
      wrong: "revel",
    },
    {
      correct: "noon",
      wrong: "coon",
    },
    {
      correct: "civic",
      wrong: "lilic",
    },
    {
      correct: "deified",
      wrong: "didi",
    },
    {
      correct: "rotor",
      wrong: "toror",
    },
    {
      correct: "refer",
      wrong: "referal",
    },
    {
      correct: "madam",
      wrong: "kakam",
    },
    {
      correct: "racecar",
      wrong: "racerac",
    },
    {
      correct: "stats",
      wrong: "statss",
    },
  ];
  const easyChoicesCopy = [...choices];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function updatePoints() {
    points.textContent = `${userPoints}`;
  }

  document.getElementById("easyButton").addEventListener("click", function () {
    //clicked the easy Game

    choices = easyChoicesCopy; //revert the original easy choices array incase changed by the hard level game

    userNameValue = document.getElementById("userName").value.trim();
    selectLevelDiv.style.display = "none";
    easyLevel.style.display = "block";
    main.style.borderColor = "green";
    userText.textContent = `Welcome ${userNameValue},`;
    timer.style.marginTop = "0";
    timer.style.background = "linear-gradient(to top, green, white)";

    shuffleArray(choices);
    gameLogic();
  });

  async function gameLogic() {
    easyAnswerOne.addEventListener("click", function () {
      if (easyAnswerOne.classList.contains("rightChoice")) {
        gotAnswer("easyAnswerOne");
      } else {
        failed("easyAnswerOne");
      }
    });
    easyAnswerTwo.addEventListener("click", function () {
      if (easyAnswerTwo.classList.contains("rightChoice")) {
        gotAnswer("easyAnswerTwo");
      } else {
        failed("easyAnswerTwo");
      }
    });

    for (let i = 0; i < choices.length; i++) {
      if (i <= 3) {
        timeLimit = 5;
      } else if (i <= 7) {
        timeLimit = 4;
      } else if (i <= 11) {
        timeLimit = 3.5;
      } else {
        timeLimit = 3;
      }

      //check or continue from here(Timer Issue)...

      timer.style.transition = `margin 0.3s ease-in-out, width ${0}s ease-in-out`;
      timer.style.width = "100%";
      timer.style.transition = `margin 0.3s ease-in-out, width ${timeLimit}s ease-in-out`;
      timer.style.width = "0%";

      if (Math.floor(Math.random() * 2) === 0) {
        easyAnswerOne.textContent = `${choices[i].correct}`;
        easyAnswerTwo.textContent = `${choices[i].wrong}`;
        updateCorrectChoice("easyAnswerOne");
      } else {
        easyAnswerOne.textContent = `${choices[i].wrong}`;
        easyAnswerTwo.textContent = `${choices[i].correct}`;
        updateCorrectChoice("easyAnswerTwo");
      }

      await new Promise((resolve) => {
        easyAnswerOne.onclick = easyAnswerTwo.onclick = resolve;

        timer.addEventListener("transitionend", function (event) {
          if (event.propertyName === "width" && event.target === timer) {
            resolve();
          }
        });
      });
    }
  } //implement the async function asap.

  function gotAnswer(button) {
    userPoints++;
    updatePoints();
    easyAnswerOne.classList.add("gotAnswer");
    if (button === "easyAnswerOne") {
      easyAnswerOne.classList.add("gotAnswer");
      function remove() {
        easyAnswerOne.classList.remove("gotAnswer");
      }
      setTimeout(remove, 500);
    } else if (button === "easyAnswerTwo") {
      easyAnswerTwo.classList.add("gotAnswer");
      function remove() {
        easyAnswerTwo.classList.remove("gotAnswer");
      }
      setTimeout(remove, 500);
    }
  }
  function failed(button) {
    if (userPoints > 0) {
      userPoints += -0.5;
    }
    updatePoints();
    if (button === "easyAnswerOne") {
      easyAnswerOne.classList.add("failedAnswer");
      function remove() {
        easyAnswerOne.classList.remove("failedAnswer");
      }
      setTimeout(remove, 500);
    } else if (button === "easyAnswerTwo") {
      easyAnswerTwo.classList.add("failedAnswer");
      function remove() {
        easyAnswerTwo.classList.remove("failedAnswer");
      }
      setTimeout(remove, 500);
    }
  }

  function updateCorrectChoice(answer) {
    if (answer === "easyAnswerOne") {
      if (easyAnswerOne.classList.contains("wrongChoice")) {
        easyAnswerOne.classList.replace("wrongChoice", "rightChoice");
        easyAnswerTwo.classList.replace("rightChoice", "wrongChoice");
      } else if (!easyAnswerOne.classList.contains("rightChoice")) {
        easyAnswerOne.classList.add("rightChoice");
        easyAnswerTwo.classList.add("wrongChoice");
      }
    } else if (answer === "easyAnswerTwo") {
      if (easyAnswerTwo.classList.contains("wrongChoice")) {
        easyAnswerTwo.classList.replace("wrongChoice", "rightChoice");
        easyAnswerOne.classList.replace("rightChoice", "wrongChoice");
      } else if (!easyAnswerTwo.classList.contains("righChoice")) {
        easyAnswerTwo.classList.add("rightChoice");
        easyAnswerOne.classList.add("wrongChoice");
      }
    } else if (answer === "hardAnswerOne") {
      if (hardAnswerOne.classList.contains("wrongChoice")) {
        hardAnswerOne.classList.replace("wrongChoice", "rightChoice");
        hardAnswerTwo.classList.replace("rightChoice", "wrongChoice");
      } else if (!hardAnswerOne.classList.contains("rightChoice")) {
        hardAnswerOne.classList.add("rightChoice");
        hardAnswerTwo.classList.add("wrongChoice");
      }
    } else if (answer === "hardAnswerTwo") {
      if (hardAnswerTwo.classList.contains("wrongChoice")) {
        hardAnswerTwo.classList.replace("wrongChoice", "rightChoice");
        hardAnswerOne.classList.replace("rightChoice", "wrongChoice");
      } else if (!hardAnswerTwo.classList.contains("righChoice")) {
        hardAnswerTwo.classList.add("rightChoice");
        hardAnswerOne.classList.add("wrongChoice");
      }
    }
  }

  document.getElementById("backEasy").addEventListener("click", function () {
    easyLevel.style.display = "none";
    selectLevelDiv.style.display = "block";
    main.style.borderColor = "white";
    timer.style.marginTop = "-1.2rem";
  });

  //continue...

  // Hard Level

  document.getElementById("hardButton").addEventListener("click", function () {
    userNameValue = document.getElementById("userName").value.trim();
    selectLevelDiv.style.display = "none";
    hardLevel.style.display = "block";
    main.style.borderColor = "red";
    timer.style.marginTop = "0";
    timer.style.background = "linear-gradient(to top, red, white)";
  });

  document.getElementById("backHard").addEventListener("click", function () {
    hardLevel.style.display = "none";
    selectLevelDiv.style.display = "block";
    main.style.borderColor = "white";
    timer.style.marginTop = "-1.2rem";
  });
});
