import { showAddButton, showHome } from "./home.js";
import { showLogin } from "./login.js"
import { showRegister } from "./register.js";

const nav = document.querySelector('nav');
showAddButton();
updateNav();
showHome();

const views = {
    'loginLink': showLogin,
    'registerLink': showRegister,
    'homeLink': showHome
}
export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
         [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

nav.addEventListener('click', (event) => {

    const view = views[event.target.id];
    if (typeof view == 'function') {
        event.preventDefault();
        view();
    }
});
document.getElementById('logoutBtn').addEventListener('click', onLogout);
async function onLogout (event) {
    event.preventDefault();
    const { token } = JSON.parse(sessionStorage.getItem('userData'));
    
const res = await fetch('http://localhost:3030/users/logout', {
    method:'post',
    headers: {
        'X-Authorization': token
    }
});

    sessionStorage.removeItem('userData');
    showAddButton();
    updateNav();
    showHome();
}