import { html, nothing } from '../../node_modules/lit-html/lit-html.js'
import { deleteBook, getById } from '../api/books.js'

const detailsTemplate = (book, user, onDelete) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <div class="actions">
        ${user && user._id === book._ownerId
        ? html`
        <a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
        : nothing}

        ${ user && user._id !== book._ownerId
        ?html`<a class="button" href="javascript:void(0)">Like</a>`
        : nothing}


        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
            
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`;


export async function detailsPage (ctx) {
    const bookId = ctx.params.id;
    const book = await getById(bookId);
    
    ctx.render(detailsTemplate(book, ctx.user, onDelete));

    async function onDelete() {
        const choise = confirm(`Are you sure you want to delete ${book.title}`);
        if(choise) {
            await deleteBook(bookId);
        }
        ctx.page.redirect('/dashboard');
    }

}

