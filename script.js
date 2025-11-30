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

let html = `

<div class="avatar-section">
        <img
          src="users/penpen.jpg"
          alt="employee"
          class="avatar-section--img"
        />
        <h3 class="avatar-section--full">Pen Pen</h3>
        <p class="avatar-section--native">Pen Pen</p>

        <button class="flex--horizontal avatar-section--copy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="avatar-section--link icon"
            viewBox="0 0 512 512"
          >
            <path
              d="M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="36"
            />
          </svg>
          <p>Copy link</p>
        </button>

        <button class="avatar-section--edit">
          <div class="flex--horizontal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="avatar-section--edit-icon icon"
              viewBox="0 0 512 512"
            >
              <path
                d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"
              />
            </svg>
            <p>edit</p>
          </div>
        </button>
      </div>
      <div class="details-section">
        <h2 class="details-section--general">general info</h2>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="details-section-icon"
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
            <p>Department:</p>
          </div>
          <p><strong>Web & Mobile</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/building-regular.svg"
              class="details-section-icon"
              alt="building icon"
            />
            <p>Building:</p>
          </div>
          <p><strong>Street with number(country)</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/door-closed-solid.svg"
              class="details-section-icon"
              alt="door icon"
            />
            <p>Room:</p>
          </div>
          <p><strong>1404</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/hashtag-solid.svg"
              class="details-section-icon"
              alt="hashtag icon"
            />
            <p>Desk Number:</p>
          </div>
          <p><strong>20</strong></p>
        </div>

        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/calendar-regular.svg"
              class="details-section-icon"
              alt="calendar icon"
            />
            <p><strong>Date of Birth:</strong></p>
          </div>
          <p>01 Jan 1901</p>
        </div>

        <div class="details-section--row last">
          <div class="flex--horizontal">
            <img
              src="icons/user-regular.svg"
              class="details-section-icon"
              alt="user icon"
            />
            <p>Manager:</p>
          </div>
          <p><strong>John Snow</strong></p>
        </div>

        <h2 class="details-section--general">Contacts</h2>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/mobile-screen-button-solid.svg"
              class="details-section-icon"
              alt="mobile icon"
            />
            <p>Mobile Phone:</p>
          </div>
          <p><strong>+99</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/at-solid.svg"
              class="details-section-icon"
              alt="at icon"
            />
            <p>Email:</p>
          </div>
          <p><strong>luffy@leverx.com</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <!-- sorry, couldn't find zoom icon anywhere -->
            <img
              src="icons/display-solid.svg"
              class="details-section-icon"
              alt="display icon"
            />
            <p>Zoom ID:</p>
          </div>
          <p><strong>123-456-789</strong></p>
        </div>
        <div class="details-section--row last">
          <div class="flex--horizontal">
            <img
              src="icons/link-solid.svg"
              class="details-section-icon"
              alt="link icon"
            />
            <p>Zoom Link:</p>
          </div>
          <strong
            ><a href="https://zoom.us/j/1234567890" text="zoom link"
              >zoom.us/j/1234567890</a
            ></strong
          >
        </div>
        <h2 class="details-section--general">Travel Info</h2>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/earth-americas-solid.svg"
              class="details-section-icon"
              alt="earth icon"
            />
            <p>Citizenship:</p>
          </div>
          <p><strong>country</strong></p>
        </div>
        <div class="details-section--row">
          <div class="flex--horizontal">
            <img
              src="icons/cc-visa-brands-solid.svg"
              class="details-section-icon"
              alt="visa icon"
            />
            <p>Visa:</p>
          </div>
          <!-- make this dynamically loaded ig, cuz it's array in json? -->
          <p><strong>National bla bla</strong></p>
        </div>
      </div>
`;
