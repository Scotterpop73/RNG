//Import our local storage functions from our localStorage.js file
import {
  saveToLocalStorageByName,
  getLocalStorage,
  removeFromLocalStorage,
} from "./localStorage.js";

//Get Elements by id and store them in a variable
let name = document.getElementById("name");
let addBtn = document.getElementById("addBtn");
let injectHere = document.getElementById("injectHere");
let customRange = document.getElementById("customRange");
// let groupsSwitch = document.getElementById("groupsSwitch");
// let groupLabel = document.getElementById("groupLabel");
let injectGroupHere = document.getElementById("injectGroupHere");
let randomStudentBtn = document.getElementById("randomStudentBtn");
let randomStudentName = document.getElementById("randomStudentName");
let season5Btn = document.getElementById("season5Btn");
let clearListBtn = document.getElementById("clearListBtn");
let peoplePerGroupRadio = document.getElementById("peoplePerGroupRadio");

//set nameArr to local storage
let nameArr = getLocalStorage();

//Create elements on load
CreateElements(nameArr);

document.getElementById("customRange").max = `${nameArr.length}`;

name.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    e.preventDefault();
    addBtn.click();
  }
})

addBtn.addEventListener("click", function (e) {
  let letters = /^[A-Za-z]+$/;
  //Check if the name is empty
  if (name.value == null || name.value == undefined || name.value.length < 1) {
    alert("Enter a Name");
  } else if (name.value.match(letters)) {
    saveToLocalStorageByName(name.value);

    nameArr = getLocalStorage();

    CreateElements(nameArr);
    document.getElementById("customRange").max = `${nameArr.length}`;
    name.value = "";
  } else {
    alert("You entered numbers or special characters in the name!");
  }
});


customRange.addEventListener("change", function (e) {
  //check if group size or number of groups is selected and call said function then create card elements after function call
  //console.log(customRange.value);
  if (peoplePerGroupRadio.checked) {
    GroupSize(customRange.value);
  } else {
    NumberOfGroups(customRange.value);
  }
});

// groupsSwitch.addEventListener("click", function (e) {
//   if (groupsSwitch.checked) {
//     groupLabel.innerText = "People per Group";
//   } else {
//     groupLabel.innerText = "Number of Groups";
//   }
// });


randomStudentBtn.addEventListener("click", function (e) {

  const namesArr = getLocalStorage();

  let randomNumber = Math.floor(Math.random() * namesArr.length);

  randomStudentName.textContent = namesArr[randomNumber][0].toUpperCase() + namesArr[randomNumber].substring(1);

});

season5Btn.addEventListener("click", function(e){
  localStorage.clear();

  nameArr = ['aisha', 'amar', 'andy', 'andrew', 'arely', 'brandon', 'carlos', 'caroline', 'chris', 'dan', 'elizar', 'fernando', 'griffin', 'busby', 'isaiah', 'jacob', 'jasmine', 'jeremy', 'jessie', 'john', 'jovann', 'kenneth', 'kent', 'lerissa', 'madeline', 'manuel', 'marcel', 'mark', 'mauricio', 'harrison', 'pedro', 'rafael', 'reed', 'richard', 'samuel', 'shaun', 'ulises']

  CreateElements(nameArr);
  document.getElementById("customRange").max = `${nameArr.length}`;

  nameArr.map(name => {
    saveToLocalStorageByName(name);
  })

});

clearListBtn.addEventListener("click", function (e) {
    localStorage.clear();

    injectHere.innerHTML = "";
    injectGroupHere.innerHTML = "";
});



function CreateElements(nameArr) {
  injectHere.innerHTML = "";
  nameArr.map((person, idx) => {
    let iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    iconPath.setAttribute(
      "d",
      "M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
    );

    let iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("xmLns", "http://www.w3.org/2000/svg");
    iconSvg.setAttribute("width", "16");
    iconSvg.setAttribute("height", "16");
    iconSvg.setAttribute("fill", "currentColor");
    iconSvg.classList.add("bi", "bi-trash3-fill");
    iconSvg.setAttribute("viewBox", "0 0 16 16");

    let iconSpan = document.createElement("span");
    iconSpan.id = "deleteBtn";
    iconSpan.className = "trashcan";
    iconSpan.addEventListener("click", function (e) {
      removeFromLocalStorage(person);
      nameArr = getLocalStorage();

      document.getElementById("customRange").max = `${nameArr.length}`;

      CreateElements(nameArr);
      injectGroupHere.innerHTML = "";
    });

    let nameLi = document.createElement("li");
    nameLi.className =
      "list-group-item d-flex justify-content-between align-items-center";
    nameLi.textContent = person[0].toUpperCase() + person.substring(1);

    iconSvg.appendChild(iconPath);
    iconSpan.appendChild(iconSvg);
    nameLi.appendChild(iconSpan);
    injectHere.appendChild(nameLi);

    return injectHere;
  });
}



function GroupSize(customRange) {
  const namesEntered = getLocalStorage();
  const groupSize = customRange;
  let tempArr = namesEntered.sort(() => Math.random() - 0.5);

  let newGroupArr = [];
  for (let i = Math.ceil(tempArr.length / groupSize); i > 0; i--) {
    newGroupArr.push(tempArr.splice(0, groupSize));
  }

  CreateCardElements(newGroupArr);
}

function NumberOfGroups(customRange) {
  const namesEntered = getLocalStorage();

  // Randomize array
  let tempArr = namesEntered.sort(() => Math.random() - 0.5);

  let result = [];

  for (let i = customRange; i > 0; i--) {
    result.push(tempArr.splice(0, Math.ceil(tempArr.length / i)));
  }

  CreateCardElements(result);
}



function CreateCardElements(groupsArr) {
  injectGroupHere.innerHTML = "";

  groupsArr.map((group, idx) => {
    let ul = document.createElement("ul");

    group.map((person, id) => {
      let li = document.createElement("li");
      li.className = "card-text";
      li.innerText = person[0].toUpperCase() + person.substring(1);
      ul.appendChild(li);
    });

    let h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerText = "Group #" + (idx + 1);

    let innerDiv = document.createElement("div");
    innerDiv.className = "card-body";

    innerDiv.appendChild(h5);
    innerDiv.appendChild(ul);

    let outerDiv = document.createElement("div");
    outerDiv.className = "card";
    outerDiv.style.width = "15rem";

    outerDiv.appendChild(innerDiv);

    let colDiv = document.createElement("div");
    colDiv.className = "col d-flex justify-content-center";

    colDiv.appendChild(outerDiv);


    injectGroupHere.appendChild(colDiv);

    return injectGroupHere;
  });
}
