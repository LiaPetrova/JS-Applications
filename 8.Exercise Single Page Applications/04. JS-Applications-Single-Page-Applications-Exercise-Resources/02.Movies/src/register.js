import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showAddButton, showHome } from "./home.js";
const section = document.getElementById("form-sign-up");
const form = section.querySelector("form");
form.addEventListener("submit", onRegister);
section.remove();

export function showRegister() {
  showView(section);
}

async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();
  const repeatPassword = formData.get("repeatPassword").trim();

  if (email == "") {
    alert("Email field should be filled!");
    throw new Error();
  } else if (password.length < 6) {
    alert("Password should be at least 6 characters long!");
    throw new Error();
  } else if (password !== repeatPassword) {
    alert("Passwords don't match!");
    throw new Error();
  }

  try {
    const res = await fetch("http://localhost:3030/users/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok != true) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();
    console.log(data);
    sessionStorage.setItem(
      "userData",
      JSON.stringify({
        email: data.email,
        id: data._id,
        token: data.accessToken,
      })
    );
    showAddButton();
    updateNav();
    showHome();
  } catch (err) {
    alert(err.message);
  }
}
