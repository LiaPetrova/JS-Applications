import { showDetails } from './detail.js';
import { showView } from './dom.js'
const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onEditSubmit);
section.remove();

export function showEdit(id) {
    loadEdit(id);
    showView(section);
}

async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    const id = formData.get('id');
    updateMovie(id, title, description, img);
}

async function updateMovie(id, title, description, img) {
    const {token} = JSON.parse(sessionStorage.getItem('userData'));
    if (title == '' ||description== '' || img== '') {
        alert('There shound\'t be any empty fields!');
        throw new Error('There shound\'t be any empty fields!');

    }
    await fetch(`http://localhost:3030/data/movies/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({title, description, img})
    });
    showDetails(id);
}

async function loadEdit(id) {
const movie = await loadMovieById(id);
form.querySelector('#title').value = movie.title;
form.querySelector('[name="description"]').textContent = movie.description;
form.querySelector('#imageUrl').value = movie.img;
form.querySelector('[name="id"]').value = id;
}

async function loadMovieById(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const data = await res.json();
    return data;
}
