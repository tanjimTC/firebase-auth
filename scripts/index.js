// setup materialize components

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

// setup guides

const guideList = document.querySelector(".guides");

const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
};

// conditional nav bar

const loggedinLinks = document.querySelectorAll(".logged-in");
const loggedoutLinks = document.querySelectorAll(".logged-out");

const setupUI = (user) => {
  if (user) {
    loggedinLinks.forEach((element) => {
      element.style.display = "block";
    });
    loggedoutLinks.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    loggedinLinks.forEach((element) => {
      element.style.display = "none";
    });
    loggedoutLinks.forEach((element) => {
      element.style.display = "block";
    });
  }
};

// account details

const accountDetails = document.querySelector(".account-details");

const displayUSer = async (user) => {
  if (user) {
    const bio = await db.collection("users").doc(user.uid).get();
    const details = `
    <div>You are logged in as ${user.email}</div>
    <div>Your user id is ${user.uid}</div>
    <div>Bio : ${bio.data().bio}</div>
  `;
    accountDetails.innerHTML = details;
  }
};
