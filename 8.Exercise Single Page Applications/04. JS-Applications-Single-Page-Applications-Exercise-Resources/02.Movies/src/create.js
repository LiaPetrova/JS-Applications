import { updateNav } from './app.js';
import { showView } from './dom.js'
import { showAddButton, showHome } from './home.js';
const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();

export function showCreate() {
    showView(section);
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    const {token} = JSON.parse(sessionStorage.getItem('userData'));
    

    if (title == '' ||description== '' || img== '') {
        alert('There shound\'t be any empty fields!');
        throw new Error('There shound\'t be any empty fields!');

    }

    try {
const res = await fetch('http://localhost:3030/data/movies', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
    },
    body: JSON.stringify({title,description, img})
});
if (res.ok != true) {
    const error = await res.json();
    throw new Error(error.message)
}
const data = await res.json();
form.reset();
updateNav();
showAddButton();
showHome();
    } catch(err){
alert(err.message);
    }

}