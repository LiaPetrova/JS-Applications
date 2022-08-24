import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { albumTemplate } from './templates/albumTemplates.js';




const searchTemplate = (searchAlbum, albums, isLogged) => html`<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${searchAlbum} class="button-list">Search</button>
</div>

<h2>Results:</h2>
${albums
? html`
<div class="search-result">
${albums.length > 0 
? albums.map(a => albumTemplate(a, isLogged))
: html`
    <p class="no-result">No result.</p>`
}
</div>`
: nothing}

</section>`;

export const searchPage = (ctx) => {

    const searchAlbum = () => {
    const searchText = document.getElementById('search-input');
    if (searchText.value == '') {
        alert ('Search filled can not be empty!');
        return;
    }
        albumService.searchAlbum(searchText.value)
        .then((albums) => ctx.render(searchTemplate(searchAlbum, albums, Boolean(ctx.user))))
            }

    ctx.render(searchTemplate(searchAlbum, false));
}