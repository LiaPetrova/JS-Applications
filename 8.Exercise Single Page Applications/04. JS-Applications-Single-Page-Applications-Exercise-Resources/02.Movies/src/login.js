import { updateNav } from './app.js';
import { showView } from './dom.js'
import { showAddButton, showHome } from './home.js';
const section = document.getElementById('form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        form.reset();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            username: data.username,
            id: data._id,
            token: data.accessToken
        }));
        showAddButton();
        updateNav();
        showHome();
    } catch (err) {
        alert(err.message)
    }
}