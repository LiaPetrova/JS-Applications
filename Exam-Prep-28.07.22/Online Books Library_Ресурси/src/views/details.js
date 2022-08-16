import { bookLikes, deleteBook, getOneBook, hasLikedTheBook, likeABook } from '../api/books.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (book, isOwner, user, hasLiked, sendLike, likesCount, onDelete) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    ${isOwner
                    ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                    <a class="button" @click = ${onDelete}>Delete</a>`
                    : null}
                    
                    ${user !==null && !isOwner && !hasLiked
                    ? html `<a class="button" @click = ${sendLike} href="">Like</a>`
                    : null}

                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likesCount}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`;


export async function detailsPage (ctx) {
    const user = getUserData();
    const book = await getOneBook(ctx.params.id);
    let isOwner = false;
    let hasLiked = false;
    if (user) {
        if(user.id == book._ownerId) {
            isOwner = true;
        }
        if (await hasLikedTheBook(book._id, user.id)) {
            hasLiked = true;
        }
    }
    
    const likesCount = await bookLikes(book._id);
    ctx.render(detailsTemplate(book, isOwner, user, hasLiked, sendLike, likesCount, onDelete));

    async function onDelete () {
        const choise = confirm(`Are you sure you want to delete ${book.title}`);
        if (choise) {
            await deleteBook(book._id);
            ctx.page.redirect('/dashboard');
        }
    }

    async function sendLike() {
        await likeABook(book._id);
    }
}