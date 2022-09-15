import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deleteEvent, getById } from '../api/events.js';
import { addLike, getLikesCount, hasLiked } from '../api/likes.js';

const detailsTemplate =  (event, user, onDelete, likesCount, hasLikedIt) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${event.title}</h1>
        <div>
            <img src=${event.imageUrl} />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${event.description}</p>
        <h4>Date: ${event.date}</h4>
        <h4>Author: ${event.author}</h4>
        <div class="buttons">
            ${user._id == event._ownerId
            ? html`<a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
            : nothing}
            
            ${user
            ?likeButton(event, user, hasLikedIt)
            : nothing}
        </div>
        <p class="likes">Likes: ${likesCount}</p>
    </div>
</div>
</section>`;

const likeButton =  (event, user, hasLikedIt) => {
    const theatherId =event._id;
    const userId = user._id;
    const isOwner = userId == event._ownerId;

    console.log(theatherId);
    console.log(userId);
    if(!isOwner && !hasLikedIt) { 
        return html`<a @click=${addLike(theatherId)} class="btn-like" href="/details/${theatherId}">Like</a>`;
    }

    
}



export async function detailsPage (ctx) {
    const eventId = ctx.params.id;
    const event = await getById(eventId);
    const likesCount = await getLikesCount(eventId);
    const hasLikeIt = await hasLiked(eventId, ctx.user._id) ;
    
    ctx.render(detailsTemplate(event, ctx.user, onDelete, likesCount, hasLikeIt));
    

    async function onDelete () {
        const choise = confirm(`Are you sure you want to delete ${event.title}`);

        if(choise) {
            await deleteEvent(eventId);
            ctx.page.redirect(`/profile`)
        }
    }
}