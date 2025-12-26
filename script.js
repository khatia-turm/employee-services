import {
  formatDateOfBirth,
  createRow,
  createVisaRows,
  switchPages,
} from "./helpers.js";

// SEARCH TOGGLES
const searchContainer = document.querySelector(".search--container");
const btnSearchBasic = document.querySelector(".search--basic");
const btnSearchAdvanced = document.querySelector(".search--advanced");
const formBasic = document.querySelector(".search--basic-form");
const formAdvanced = document.querySelector(".search--advanced-form");

// LIST/GRID VIEW BUTTONS
const gridView = document.querySelector(".employee-grid");
const listView = document.querySelector(".employee-menu");
const btnViewGrid = document.querySelector(".view--grid");
const btnViewList = document.querySelector(".view--menu");
const gridIcon = document.querySelector(".grid--icon");
const listIcon = document.querySelector(".menu--icon");
const container = document.querySelector(".grid-container");

// BASIC SEARCH INPUTS
let searchFull = document.querySelector(".basic-form--full");
let btnBasicSubmit = document.querySelector(".basic--submit");

// ADVANCED SEARCH INPUTS
const advFullName = document.getElementById("name");
const advEmail = document.getElementById("email");
const advPhone = document.getElementById("phone");
const advZoom = document.getElementById("zoom");
const advBuilding = document.getElementById("building");
const advRoom = document.getElementById("room");
const advDepartment = document.getElementById("department");
const btnAdvanced = document.querySelector(".adv");
// HEADER BUTTONS
const btnHeader = document.querySelector(".header--heading");
const loggedIn = document.querySelector(".header--logged-in");
// const btnLogOff = document.querySelector(".header--logoff");
const addressBook = document.querySelector(".header--active-tab");

// for nothing found page
const wholePage = document.querySelector(".whole--page");
const notFound = document.querySelector(".nothing--found");
const btnGoBack = document.querySelector(".go-back");

/* declaring users array so i can use it throughout the code
otherwise, since function is async, it will be undefined */
let users = [];
async function getUsers() {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) throw new Error("response was not loaded");

    users = await response.json();

    if (window.location.pathname.endsWith("userDetails.html")) {
      loadUserDetails();
    } else {
      initApp();
    }
  } catch (error) {
    console.error("messed up", error);
  }
}

/*initializes the app with all the methods that use data array */
function initApp() {
  users.forEach((u) => {
    renderUserBasicGrid(u);
    renderUserBasicList(u);
  });
}

getUsers();

// RENDERING USERS
function renderUserBasicGrid(user) {
  let html = `
        <div class="employee-ind employee-item" data-id="${user._id}">    
        <img
            src="../${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-grid--img"
          />
          <p class="employee-grid--name">${user.first_name} ${user.last_name}</p>
          <span class="border"></span>
          <div class="employee--flex-container">
            <div class="employee--flex-item">
              <img src="../svgs/briefcase-icon.svg" alt="briefcase icon" class="employee--icon"/>
              <p class="employee-grid-job">${user.department}</p>
            </div>
            <div class="employee--flex-item">
              <img src="../svgs/door-icon.svg" alt="door-icon" class="employee--icon"/>
              <p class="employee-grid-job">${user.room}</p>
            </div>
   
        </div>
  `;

  gridView?.insertAdjacentHTML("beforeend", html);
}

function renderUserBasicList(user) {
  let html = `
        <div class="employee-row employee-item" data-id="${user._id}">
          <img
            src="../${user.user_avatar}"
            alt="${user.first_name}"
            class="employee-menu--img"
          />
          <p class="employee-menu--name">${user.first_name} ${user.last_name}</p>
          <p class="employee-menu--department">${user.department}</p>
          <p class="employee-menu--room">${user.room}</p>
        </div>`;

  listView?.insertAdjacentHTML("beforeend", html);
}

// SWITCHING LAYOUTS

function toggleForms(showBasic) {
  formBasic.classList.toggle("hidden", !showBasic);
  formAdvanced.classList.toggle("hidden", showBasic);
  btnSearchBasic.classList.toggle("active", showBasic);
  btnSearchAdvanced.classList.toggle("active", !showBasic);
}

btnSearchBasic?.addEventListener("click", () => toggleForms(true));
btnSearchAdvanced?.addEventListener("click", () => toggleForms(false));

function toggleViews(showGrid) {
  gridView.classList.toggle("hidden", !showGrid);
  listView.classList.toggle("hidden", showGrid);
  listIcon.classList.toggle("clicked", !showGrid);
  gridIcon.classList.toggle("clicked", showGrid);
}

btnViewGrid?.addEventListener("click", () => toggleViews(true));
btnViewList?.addEventListener("click", () => toggleViews(false));

function togglePage(showPage) {
  notFound.classList.toggle("hidden", showPage);
  wholePage.classList.toggle("hidden", !showPage);
}

// IMPLEMENTING BASIC SEARCH

function handleUserSearch() {
  const fullName = searchFull.value.trim().toLowerCase();

  if (!firstName) {
    return;
  }

  const user = users.find((u) => {
    const uFull = `${u.first_name} ${u.last_name}`.toLocaleLowerCase();
    return uFull.includes(fullName);
  });
  searchFull.value = "";

  if (!user) {
    togglePage(false);
  } else switchPages(`userDetails.html?id=${user._id}`);
}

btnBasicSubmit?.addEventListener("click", (e) => {
  e.preventDefault();
  handleUserSearch();
});

// implementing advanced search
function handleAdvancedSearch() {
  const name = advFullName.value.trim().toLowerCase();
  const email = advEmail.value.trim().toLowerCase();
  const phone = advPhone.value.trim();
  const zoom = advZoom.value.trim().toLowerCase();
  const building = advBuilding.value;
  const room = advRoom.value.trim();
  const department = advDepartment.value;

  const user = users.find((u) => {
    const uFull = `${u.first_name} ${u.last_name}`.toLowerCase();

    if (name && !uFull.includes(name)) return false;
    if (email && !u.email.toLowerCase().includes(email)) return false;
    if (phone && !u.phone.includes(phone)) return false;
    if (zoom && !u.zoom_id.toLowerCase().includes(zoom)) return false;
    if (building !== "any" && u.building !== building) return false;
    if (room && u.room !== room) return false;
    if (department !== "Any" && u.department !== department) return false;

    return true;
  });

  // clear inputs
  [advFullName, advEmail, advPhone, advZoom, advRoom].forEach(
    (i) => (i.value = "")
  );
  if (!user) {
    togglePage(false);
  } else switchPages(`userDetails.html?id=${user._id}`);
}

btnAdvanced?.addEventListener("click", (e) => {
  e.preventDefault();
  handleAdvancedSearch();
});

function displayDetailedUser(user) {
  const userDetails = document.querySelector(".user--details");
  let html = `
    <div class="avatar-section">
    <div class="wrapper">
      <img src="../${
        user.user_avatar
      }" alt="employee" class="avatar-section--img"/>
      ${
        user.isRemoteWork
          ? `<div class="home-box">
              <img src="../svgs/home-icon.svg" alt="home icon" class="avatar-section--home"/>
            </div>`
          : ""
      } </div>
      <h3 class="avatar-section--full">${user.first_name} ${user.last_name}</h3>
      <p class="avatar-section--native">${user.first_native_name} ${
    user.middle_native_name
  } ${user.last_native_name}</p>
      
      <button class="flex--horizontal avatar-section--copy">
        <img src="../svgs/link-icon.svg" class="avatar-section--link">
        <p>Copy link</p>
      </button>

      <button class="avatar-section--edit">
        <div class="flex--horizontal">
          <img src="../svgs/edit-icon.svg" alt="edit icon" class="avatar-section--edit-icon icon"/>
          <p>edit</p>
        </div>
      </button>
    </div>

    <div class="details-section">
      <h2 class="details-section--general">General Info</h2>
    ${createRow("briefcase-icon.svg", "Department", user.department)}
    ${createRow("building-icon.svg", "Building", user.building)}
    ${createRow("door-icon.svg", "Room", user.room)}
    ${createRow("hashtag-icon.svg", "Desk Number", user.desk_number)}
    ${createRow(
      "calendar-icon.svg",
      "Date Of Birth",
      formatDateOfBirth(user.date_birth)
    )}
    ${createRow(
      "user-icon.svg",
      "Manager",
      `${user.manager.first_name} ${user.manager.last_name}`
    )}

      <h2 class="details-section--general">Contacts</h2>
      ${createRow("mobile-icon.svg", "Mobile Phone", user.phone)}
      ${createRow("at-icon.svg", "Email", user.email)}
      ${createRow("zoom-icon.svg", "Zoom ID", user.zoom_id)}
      ${createRow("zoom-icon.svg", "Zoom Link", user.zoom_link)}
    
      <h2 class="details-section--general">Travel Info</h2>
      ${createRow("globe-icon.svg", "Citizenship", user.citizenship)}
      ${createVisaRows(user.visa)}
      `;
  userDetails.innerHTML = html;
  const copyUserLink = document.querySelector(".avatar-section--copy");

  copyUserLink?.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href);
  });
}

function loadUserDetails() {
  const par = new URLSearchParams(window.location.search);
  const userId = par.get("id");
  if (!userId) return;
  const user = users.find((u) => String(u._id) === String(userId));
  if (!user) {
    togglePage(false);
  } else displayDetailedUser(user);
}

loggedIn?.addEventListener("click", () => {
  const userId = loggedIn.dataset.id;
  if (!userId) return;

  switchPages(`userDetails.html?id=${userId}`);
});

btnHeader?.addEventListener("click", () => switchPages("index.html"));
addressBook?.addEventListener("click", () => switchPages("index.html"));

container?.addEventListener("click", (e) => {
  if (e.target.closest(".employee-item")) {
    const clickedId = e.target.closest(".employee-item").dataset.id;
    switchPages(`userDetails.html?id=${clickedId}`);
  }
});

btnGoBack?.addEventListener("click", () => togglePage(true));
