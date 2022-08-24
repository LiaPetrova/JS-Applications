import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';

const onlyOwnersTemplate = (albumId, onDelete) => html`
<div class="actionBtn">
    <a href="edit/${albumId}" class="edit">Edit</a>
    <a  @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
</div>`;

const detailsTemplate = (album, user, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist:  ${album.artist}</h3>
                <h4>Genre:  ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date:  ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>
            ${user._id == album._ownerId
            ? onlyOwnersTemplate(album._id, onDelete)
            : nothing}
        </div>
    </div>
</section>
`;

export const detailsPage = (ctx) => {
   albumService.getById(ctx.params.id)
   .then((album) =>{
        ctx.render(detailsTemplate(album, ctx.user, onDelete))})

        const onDelete = () => {
           const choise =  confirm('Are you sure you want to delete this album?');
            if(choise) {
                albumService.deleteAlbum(ctx.params.id)
                .then(() => {
                    ctx.page.redirect('/catalog')
                })
            }
        }
}