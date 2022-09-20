import { html } from '../../node_modules/lit-html/lit-html.js';
import { getByUserId } from '../api/books.js';

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>

${books.length > 0
    ? bookList(books)
    : html`<p class="no-books">No books in database!</p>`}

</section>`;

const bookList = (books) => html`
<ul class="my-books-list">
 ${books.map(bookCard)}
</ul>`;

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBooksPage (ctx) {
    const books = await getByUserId(ctx.user._id);
    ctx.render(myBooksTemplate(books));
}