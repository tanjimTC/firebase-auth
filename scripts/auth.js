// sign up a new user

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  email = signupForm["signup-email"].value;
  password = signupForm["signup-password"].value;

  //   sign up the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      db.collection("users")
        .doc(userCredential.user.uid)
        .set({
          bio: signupForm["signup-bio"].value,
        })
        .then(() => {
          //   getting the signup modal and closing it
          const modal = document.querySelector("#modal-signup");
          M.Modal.getInstance(modal).close();
          signupForm.reset();
        });
    })

    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
    });
});

// log in an existing user

const signinForm = document.querySelector("#login-form");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  email = signinForm["login-email"].value;
  password = signinForm["login-password"].value;

  //   sign in the user
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //   console.log("logged in", userCredential.user);
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      signinForm.reset();
    })

    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
    });
});

// user logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// add guides form

const guidesForm = document.querySelector("#create-form");
guidesForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("guides")
    .add({
      title: guidesForm["title"].value,
      content: guidesForm["content"].value,
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      guidesForm.reset();
    })
    .catch(function (error) {
      let errorMessage = error.message;
      alert(errorMessage);
    });
});

// auth status
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    // getting data from firestore
    db.collection("guides").onSnapshot(
      (querySnapshot) => {
        setupGuides(querySnapshot.docs);
        setupUI(user);
        displayUSer(user);
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    setupGuides([]);
    setupUI();
    displayUSer();
  }
});