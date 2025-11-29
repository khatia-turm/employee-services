// ELEMENTS
const searchContainer = document.querySelector(".search--container");
const btnSearchBasic = document.querySelector(".search--basic");
const btnSearchAdvanced = document.querySelector(".search--advanced");
const formBasic = document.querySelector(".search--basic-form");
const formAdvanced = document.querySelector(".search--advanced-form");
const gridView = document.querySelector(".employee-grid");
const listView = document.querySelector(".employee-menu");
const btnViewGrid = document.querySelector(".view--grid");
const btnViewList = document.querySelector(".view--menu");
const gridIcon = document.querySelector(".grid--icon");
const listIcon = document.querySelector(".menu--icon");

// FETCHING DATA
// fetch("data.json")
//   .then((response) => response.json())
//   .then((users) => {
//     // to test
//     console.log(users);
//     users.forEach((user) => {
//       renderUserBasicGrid(user);
//       renderUserBasicList(user);
//     });
//   })
//   .catch((error) => console.error("messed up", error));

let users;
async function getUsers() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("response was not loaded");

    users = await response.json();

    // to test
    console.log(users);
    users.forEach((user) => {
      renderUserBasicGrid(user);
      renderUserBasicList(user);
    });
  } catch (error) {
    console.error("messed up", error);
  }
}

getUsers();

// RENDERING USERS
function renderUserBasicGrid(user) {
  let html = `
   
        <div class="employee-ind">
          <img
            src="${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-grid--img"
          />
          <p class="employee-grid--name">${user.first_name} ${user.last_name}</p>
          <span class="border"></span>
          <div class="employee--flex-container">
            <div class="employee--flex-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="employee--icon"
                viewBox="0 0 512 512"
              >
                <rect
                  x="32"
                  y="128"
                  width="448"
                  height="320"
                  rx="48"
                  ry="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="32"
                />
                <path
                  d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32M480 240H32M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                />
              </svg>
              <p class="employee-grid-job">${user.department}</p>
            </div>
            <div class="employee--flex-item">
              <svg
                class="employee--icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                />
              </svg>
              <p class="employee-grid-job">${user.room}</p>
            </div>
   
        </div>
  `;

  gridView.insertAdjacentHTML("beforeend", html);
}

function renderUserBasicList(user) {
  let html = `
<div class="employee-row">
          <img
            src="${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-menu--img"
          />
          <p class="employee-menu--name">${user.first_name} ${user.last_name}</p>
          <p class="employee-menu--department">${user.department}</p>
          <p class="employee-menu--room">${user.room}</p>
        </div>`;

  listView.insertAdjacentHTML("beforeend", html);
}

/*  <img
            src="img/steve-cook.jpg"
            alt="employee steve cook"
            class="header--employee-img"
          />

          <p class="header--employee">steve cook</p>
        </button>
        <button class="logoff-btn btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="header--logoff"
            viewBox="0 0 512 512"
          >
            <path
              d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            />
          </svg> */

// SWITCHING LAYOUTS

btnSearchBasic.addEventListener("click", () => {
  formBasic.classList.remove("hidden");
  formAdvanced.classList.add("hidden");
});

btnSearchAdvanced.addEventListener("click", () => {
  formBasic.classList.add("hidden");
  formAdvanced.classList.remove("hidden");
});

btnViewList.addEventListener("click", () => {
  gridView.classList.add("hidden");
  listView.classList.remove("hidden");
  listIcon.classList.add("clicked");
  gridIcon.classList.remove("clicked");
});
btnViewGrid.addEventListener("click", () => {
  gridView.classList.remove("hidden");
  listView.classList.add("hidden");
  listIcon.classList.remove("clicked");
  gridIcon.classList.add("clicked");
});

// IMPLEMENTING BASIC SEARCH
searchName = document.querySelector(".basic-form--name");
searchLast = document.querySelector(".basic-form--last");
searchFull = document.querySelector(".basic-form--full");
searchID = document.querySelector(".input-id");
btnBasicSubmit = document.querySelector(".basic--submit");

let firstName, lastName, fullName, id;
btnBasicSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  firstName = searchName.value;
  lastName = searchLast.value;
  fullName = searchFull.value;
  id = searchID.value;

  // to test
  console.log(firstName, lastName, fullName, id);

  searchName.value = "";
  searchLast.value = "";
  searchFull.value = "";
  searchID.value = "";

  // THERE MUST BE BETTER WAY - will research later
  window.location.href = `userDetails.html`;
});

// display user dits
function displayDetailedUser(user) {}
