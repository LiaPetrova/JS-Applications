import { showCreate } from './create.js';
import { e, showView } from './dom.js';
import { showDetails } from './detail.js';

let movieCashe = null;
let lastLoaded = null;
const maxAge = 1000; // one second

const section = document.getElementById('home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');

section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
});
const addMovieBtn = section.querySelector('#add-movie-button');
section.remove();

catalog.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    if (target.tagName == 'BUTTON') {
        target = target.parentElement;;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
})


export function showHome() {
    showView(section);
    getMovies();
}

export function showAddButton (){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData!=null) {
        addMovieBtn.style.display = 'block';
    } else {
        addMovieBtn.style.display = 'none';
    }
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'));

    let now = Date.now();
    if (movieCashe == null || now - lastLoaded > maxAge) {
        lastLoaded = now;
        const res = await fetch('http://localhost:3030/data/movies');
        const data = await res.json();
        movieCashe = data;
    }

    catalog.replaceChildren(...movieCashe.map(createMovieCard));
}

function createMovieCard(movie) {
    const element = e('div', { className: 'card mb-4' });
    element.innerHTML = `<img class="card-img-top" src=${movie.img} alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a data-id=${movie._id} href="#">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;
    return element;
}