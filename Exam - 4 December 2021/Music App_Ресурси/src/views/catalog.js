import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { albumTemplate } from './templates/albumTemplates.js';

const catalogTemplate = (albums, isLogged) => html`
<section id="catalogPage">
    <h1>All Albums</h1> 

${albums.map(a => albumTemplate(a, Boolean(isLogged)))};
    <!--No albums in catalog-->
${albums.length == 0 
    ? html`<p>No Albums in Catalog!</p>`
    : nothing}
    

</section>`;

export const catalogView = (ctx) => {
    albumService.getAll()
    .then(albums => {
        ctx.render(catalogTemplate(albums, ctx.user));
    });
}