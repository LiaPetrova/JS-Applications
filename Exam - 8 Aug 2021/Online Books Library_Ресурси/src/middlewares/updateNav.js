import { html, render } from "../../node_modules/lit-html/lit-html.js";

const headerEl = document.getElementById('site-header');

const navTemplate = (user) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/dashboard">Dashboard</a>
        
        ${!user
        ? html`
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>`
        : html`
        <div id="user">
            <span>Welcome, ${user.email}</span>
            <a class="button" href="/myBooks">My Books</a>
            <a class="button" href="/add">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>`}
    </section>
</nav>`;


export async function updateNav (ctx, next) {
    render(navTemplate(ctx.user), headerEl);

    next(); 
}